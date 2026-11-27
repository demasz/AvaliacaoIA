import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mainDishId = "00000000-0000-4000-8000-000000000101";
const drinkId = "00000000-0000-4000-8000-000000000103";
const skewerId = "00000000-0000-4000-8000-000000000105";

let app: ReturnType<(typeof import("../../src/app.ts"))["createApp"]>;
let sequelize: (typeof import("../../src/database/connection.ts"))["sequelize"];
let models: typeof import("../../src/models/index.ts");
let apiServices: (typeof import("../../src/modules/api-services.ts"))["apiServices"];

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  if (!process.env.DATABASE_URL_TEST) {
    throw new Error(
      "DATABASE_URL_TEST é obrigatória para testes de integração; DATABASE_URL não será usada como alternativa.",
    );
  }

  const { getTestDatabaseUrl } = await import("../../src/config/env.ts");
  getTestDatabaseUrl();

  const [{ createApp }, database, modelModule, services] = await Promise.all([
    import("../../src/app.ts"),
    import("../../src/database/connection.ts"),
    import("../../src/models/index.ts"),
    import("../../src/modules/api-services.ts"),
  ]);
  app = createApp(services.apiServices);
  sequelize = database.sequelize;
  models = modelModule;
  apiServices = services.apiServices;

  await sequelize.authenticate();
  const { migrator } = await import("../../src/database/migrator.ts");
  await migrator.up();
  const { seedCatalog } = await import("../../src/database/seeders/catalog.ts");
  await seedCatalog();
}, 30_000);

beforeEach(async () => {
  await models.Order.destroy({ where: {}, truncate: true, cascade: true });
  await models.Product.update({ active: true }, { where: {} });
  await models.Product.update(
    { priceCents: 2500, name: "Mix de Carnes" },
    { where: { id: mainDishId } },
  );
});

afterAll(async () => {
  if (sequelize) await sequelize.close();
});

describe("API integrada ao PostgreSQL de teste", () => {
  it("retorna saúde, categorias e catálogo persistidos", async () => {
    await request(app).get("/api/health").expect(200, { status: "ok", service: "cardapio-api" });
    const categories = await request(app).get("/api/categories").expect(200);
    expect(categories.body.data).toHaveLength(4);
    expect(new Set(categories.body.data.map((item: { slug: string }) => item.slug)).size).toBe(4);
    const products = await request(app).get("/api/products").expect(200);
    expect(products.body.data).toHaveLength(8);
    expect(products.body.data[0]).toHaveProperty("category.slug");
    expect(
      products.body.data
        .filter((item: { imageUrl: string | null }) => item.imageUrl !== null)
        .map((item: { slug: string }) => item.slug)
        .sort(),
    ).toEqual([
      "espetao-da-taverna",
      "espetinho-da-taverna",
      "maca-recheada",
      "mix-de-carnes",
      "mix-de-cogumelos",
      "pao-com-queijo",
    ]);
    const mainDish = await request(app).get(`/api/products/${mainDishId}`).expect(200);
    expect(mainDish.body.data.priceCents).toBe(2500);
    expect(mainDish.body.data.category.slug).toBe("mains");
    expect(mainDish.body.data.imageUrl).toBe("/images/mix-de-carnes.jpg");
    const featuredMainDishes = await request(app)
      .get("/api/products?category=mains&featured=true")
      .expect(200);
    expect(featuredMainDishes.body.data.map((item: { slug: string }) => item.slug)).toEqual([
      "mix-de-carnes",
    ]);
  });

  it("keeps category and product seeds idempotent", async () => {
    const { seedCatalog } = await import("../../src/database/seeders/catalog.ts");
    await seedCatalog();
    await seedCatalog();
    expect(await models.Category.count()).toBe(4);
    expect(await models.Product.count()).toBe(8);
  });

  it("filtra produtos por categoria e destaque e esconde produtos inativos", async () => {
    await models.Product.update({ active: false }, { where: { id: drinkId } });
    const drinks = await request(app).get("/api/products?category=drinks").expect(200);
    expect(drinks.body.data).toHaveLength(1);
    expect(drinks.body.data[0].slug).toBe("red-elixir");

    const featured = await request(app).get("/api/products?featured=true").expect(200);
    expect(featured.body.data.map((item: { slug: string }) => item.slug).sort()).toEqual([
      "maca-recheada",
      "mix-de-carnes",
    ]);

    await request(app).get(`/api/products/${drinkId}`).expect(404);
    await request(app).get("/api/products?category=unknown").expect(404);
  });

  it("persists an order with server-calculated snapshots and the expected 8200-cent total", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        items: [
          { productId: mainDishId, quantity: 2 },
          { productId: drinkId, quantity: 1 },
          { productId: skewerId, quantity: 2 },
        ],
      });
    expect(response.status, JSON.stringify(response.body)).toBe(201);

    expect(response.body.data.totalCents).toBe(8200);
    expect(
      response.body.data.items.map((item: { subtotalCents: number }) => item.subtotalCents),
    ).toEqual([5000, 800, 2400]);
    expect(await models.Order.count()).toBe(1);
    expect(await models.OrderItem.count()).toBe(3);
  });

  it("rejects missing, inactive, duplicated and invalid items without persisting an order", async () => {
    await request(app).post("/api/orders").send({ items: [] }).expect(400);
    await request(app)
      .post("/api/orders")
      .send({ items: [{ productId: "00000000-0000-4000-8000-000000000999", quantity: 1 }] })
      .expect(404);
    await models.Product.update({ active: false }, { where: { id: mainDishId } });
    await request(app)
      .post("/api/orders")
      .send({ items: [{ productId: mainDishId, quantity: 1 }] })
      .expect(409);
    await request(app)
      .post("/api/orders")
      .send({
        items: [
          { productId: drinkId, quantity: 1 },
          { productId: drinkId, quantity: 1 },
        ],
      })
      .expect(400);
    expect(await models.Order.count()).toBe(0);
  });

  it("ignores no forged money because the strict contract rejects it", async () => {
    await request(app)
      .post("/api/orders")
      .send({
        items: [{ productId: mainDishId, quantity: 2, unitPriceCents: 1, subtotalCents: 2 }],
        totalCents: 2,
      })
      .expect(400);
    expect(await models.Order.count()).toBe(0);
  });

  it("rolls back the order when inserting an item fails", async () => {
    const insertion = vi
      .spyOn(models.OrderItem, "bulkCreate")
      .mockRejectedValueOnce(new Error("simulated item insertion failure"));
    await request(app)
      .post("/api/orders")
      .send({ items: [{ productId: mainDishId, quantity: 1 }] })
      .expect(500);
    insertion.mockRestore();
    expect(await models.Order.count()).toBe(0);
  });

  it("preserves historical price and product name after the current product changes", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({ items: [{ productId: mainDishId, quantity: 1 }] })
      .expect(201);
    await models.Product.update(
      { priceCents: 3000, name: "Nome atualizado" },
      { where: { id: mainDishId } },
    );
    const snapshot = await models.OrderItem.findOne({
      where: { orderId: response.body.data.id },
    });
    expect(snapshot?.unitPriceCents).toBe(2500);
    expect(snapshot?.productName).toBe("Mix de Carnes");
  });
});
