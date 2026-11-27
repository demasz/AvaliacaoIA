import { listCategories } from "./categories/categories.service.ts";
import { createOrder } from "./orders/orders.service.ts";
import { getProduct, listProducts } from "./products/products.service.ts";
import type { ApiServices } from "../types/api.ts";

export const apiServices: ApiServices = {
  listCategories,
  listProducts,
  getProduct,
  createOrder,
};
