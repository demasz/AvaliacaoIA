import type { Sequelize, Transaction } from "sequelize";
import { Category, Product } from "../../models/index.ts";
import { sequelize } from "../connection.ts";

const categorySeeds = [
  { id: "00000000-0000-4000-8000-000000000001", name: "Pratos principais", slug: "mains" },
  { id: "00000000-0000-4000-8000-000000000002", name: "Bebidas", slug: "drinks" },
  { id: "00000000-0000-4000-8000-000000000003", name: "Acompanhamentos", slug: "sides" },
  { id: "00000000-0000-4000-8000-000000000004", name: "Sobremesas", slug: "desserts" },
] as const;

const productSeeds = [
  {
    id: "00000000-0000-4000-8000-000000000101",
    slug: "mix-de-carnes",
    name: "Mix de Carnes",
    description:
      "Seleção de carnes grelhadas com cortes variados, acompanhada de legumes e vegetais frescos.",
    priceCents: 2500,
    categorySlug: "mains",
    imageUrl: "/images/mix-de-carnes.jpg",
    featuredLabel: "O favorito da taverna",
  },
  {
    id: "00000000-0000-4000-8000-000000000102",
    slug: "espetao-da-taverna",
    name: "Espetão da Taverna",
    description: "Espetão generoso com porções grelhadas e ervas aromáticas, servido no espeto.",
    priceCents: 2900,
    categorySlug: "mains",
    imageUrl: "/images/espetao.jpg",
    featuredLabel: null,
  },
  {
    id: "00000000-0000-4000-8000-000000000103",
    slug: "blue-potion",
    name: "Poção Azul",
    description: "Limonada azul bem gelada, com um toque cítrico e refrescante. 400 ml.",
    priceCents: 800,
    categorySlug: "drinks",
    imageUrl: null,
    featuredLabel: null,
  },
  {
    id: "00000000-0000-4000-8000-000000000104",
    slug: "red-elixir",
    name: "Elixir de Fogo",
    description: "Frutas vermelhas, limão e um toque de alecrim. Uma mistura encantadora. 400 ml.",
    priceCents: 1000,
    categorySlug: "drinks",
    imageUrl: null,
    featuredLabel: null,
  },
  {
    id: "00000000-0000-4000-8000-000000000105",
    slug: "espetinho-da-taverna",
    name: "Espetinho da Taverna",
    description:
      "Espetinhos grelhados com pedaços dourados e temperos da casa, servidos em uma porção para compartilhar.",
    priceCents: 1200,
    categorySlug: "mains",
    imageUrl: "/images/espetinho.jpg",
    featuredLabel: null,
  },
  {
    id: "00000000-0000-4000-8000-000000000106",
    slug: "mix-de-cogumelos",
    name: "Mix de Cogumelos",
    description: "Mix de cogumelos salteados, finalizado com ervas frescas e uma rodela cítrica.",
    priceCents: 1400,
    categorySlug: "sides",
    imageUrl: "/images/mix-de-cogumelos.jpg",
    featuredLabel: null,
  },
  {
    id: "00000000-0000-4000-8000-000000000107",
    slug: "pao-com-queijo",
    name: "Pão com Queijo",
    description:
      "Fatias de pão dourado cobertas com queijo derretido e ervas, servidas quentinhas.",
    priceCents: 1100,
    categorySlug: "sides",
    imageUrl: "/images/pao-com-queijo.jpg",
    featuredLabel: null,
  },
  {
    id: "00000000-0000-4000-8000-000000000108",
    slug: "maca-recheada",
    name: "Maçã Recheada",
    description:
      "Maçã assada recheada com creme suave e especiarias, acompanhada de fatias da fruta.",
    priceCents: 1600,
    categorySlug: "desserts",
    imageUrl: "/images/maca-recheada.jpg",
    featuredLabel: "Um final encantador",
  },
] as const;

async function seedCatalogInTransaction(transaction: Transaction): Promise<void> {
  const categoryIds = new Map<string, string>();

  for (const seed of categorySeeds) {
    const [category, created] = await Category.findOrCreate({
      where: { id: seed.id },
      defaults: seed,
      transaction,
    });
    if (!created) await category.update(seed, { transaction });
    categoryIds.set(seed.slug, category.id);
  }

  for (const seed of productSeeds) {
    const categoryId = categoryIds.get(seed.categorySlug);
    if (!categoryId) throw new Error(`Categoria de seed ausente: ${seed.categorySlug}`);

    const productData = {
      id: seed.id,
      slug: seed.slug,
      name: seed.name,
      description: seed.description,
      priceCents: seed.priceCents,
      categoryId,
      imageUrl: seed.imageUrl,
      featured: seed.featuredLabel !== null,
      featuredLabel: seed.featuredLabel,
      active: true,
    };
    const [product, created] = await Product.findOrCreate({
      where: { id: seed.id },
      defaults: productData,
      transaction,
    });
    if (!created) await product.update(productData, { transaction });
  }
}

export async function seedCatalog(database: Sequelize = sequelize): Promise<void> {
  await database.transaction(seedCatalogInTransaction);
}
