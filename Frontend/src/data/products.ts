import type { Product } from "@/lib/api/types";

export type { Category, Product } from "@/lib/api/types";

export function filterProducts(products: Product[], category: string): Product[] {
  return category === "all"
    ? products
    : products.filter((product) => product.category.slug === category);
}
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
