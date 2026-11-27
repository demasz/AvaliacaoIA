import { Category, Product } from "../../models/index.ts";
import type { ProductDto, ProductFilters } from "../../types/api.ts";
import { HttpError } from "../../utils/http-error.ts";

function toProductDto(product: Product): ProductDto {
  const category = product.category;
  if (!category) throw new Error("Produto retornado sem categoria associada.");

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    priceCents: product.priceCents,
    category: { id: category.id, name: category.name, slug: category.slug },
    imageUrl: product.imageUrl,
    featured: product.featured,
    featuredLabel: product.featuredLabel,
  };
}

export async function listProducts(filters: ProductFilters): Promise<ProductDto[]> {
  const where: { active: boolean; featured?: boolean; categoryId?: string } = { active: true };

  if (filters.featured !== undefined) where.featured = filters.featured;
  if (filters.category) {
    const category = await Category.findOne({ where: { slug: filters.category } });
    if (!category) {
      throw new HttpError(404, "CATEGORY_NOT_FOUND", "A categoria solicitada não foi encontrada.");
    }
    where.categoryId = category.id;
  }

  const products = await Product.findAll({
    where,
    include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }],
    order: [["name", "ASC"]],
  });

  return products.map(toProductDto);
}

export async function getProduct(id: string): Promise<ProductDto> {
  const product = await Product.findOne({
    where: { id, active: true },
    include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }],
  });

  if (!product) {
    throw new HttpError(404, "PRODUCT_NOT_FOUND", "O produto solicitado não foi encontrado.");
  }

  return toProductDto(product);
}
