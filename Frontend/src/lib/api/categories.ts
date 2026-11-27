import type { Category } from "./types";
import { apiRequest } from "./client";

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return apiRequest<Category[]>("/categories", signal ? { signal } : {});
}
