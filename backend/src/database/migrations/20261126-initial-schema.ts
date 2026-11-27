import { DataTypes, type QueryInterface } from "sequelize";
import type { MigrationParams } from "umzug";

export async function up({ context }: MigrationParams<QueryInterface>): Promise<void> {
  await context.createTable("categories", {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING(80), allowNull: false },
    slug: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });

  await context.createTable("products", {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price_cents: { type: DataTypes.INTEGER, allowNull: false },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    image_url: { type: DataTypes.STRING(500), allowNull: true },
    featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    featured_label: { type: DataTypes.STRING(120), allowNull: true },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });

  await context.createTable("orders", {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    status: { type: DataTypes.STRING(20), allowNull: false },
    total_cents: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });

  await context.createTable("order_items", {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "orders", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "products", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    product_name: { type: DataTypes.STRING(120), allowNull: false },
    unit_price_cents: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    subtotal_cents: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });

  await context.addIndex("products", ["category_id"], { name: "products_category_id_idx" });
  await context.addIndex("products", ["active", "featured"], { name: "products_catalog_idx" });
  await context.addIndex("orders", ["created_at"], { name: "orders_created_at_idx" });
  await context.addIndex("order_items", ["order_id"], { name: "order_items_order_id_idx" });
  await context.addIndex("order_items", ["product_id"], { name: "order_items_product_id_idx" });
  await context.sequelize.query(
    'ALTER TABLE "products" ADD CONSTRAINT "products_price_cents_nonnegative" CHECK ("price_cents" >= 0)',
  );
  await context.sequelize.query(
    'ALTER TABLE "orders" ADD CONSTRAINT "orders_status_confirmed" CHECK ("status" = \'CONFIRMED\')',
  );
  await context.sequelize.query(
    'ALTER TABLE "orders" ADD CONSTRAINT "orders_total_cents_nonnegative" CHECK ("total_cents" >= 0)',
  );
  await context.sequelize.query(
    'ALTER TABLE "order_items" ADD CONSTRAINT "order_items_quantity_positive" CHECK ("quantity" > 0)',
  );
  await context.sequelize.query(
    'ALTER TABLE "order_items" ADD CONSTRAINT "order_items_money_nonnegative" CHECK ("unit_price_cents" >= 0 AND "subtotal_cents" >= 0)',
  );
}

export async function down({ context }: MigrationParams<QueryInterface>): Promise<void> {
  await context.dropTable("order_items");
  await context.dropTable("orders");
  await context.dropTable("products");
  await context.dropTable("categories");
}
