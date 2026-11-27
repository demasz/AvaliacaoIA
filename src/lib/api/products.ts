import type { Product } from "./types";
import { apiRequest } from "./client";

export function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return apiRequest<Product[]>("/products", signal ? { signal } : {});
}
