import type { CreateOrderItem, OrderConfirmation } from "./types";
import { apiRequest } from "./client";

export function createOrder(items: CreateOrderItem[]): Promise<OrderConfirmation> {
  return apiRequest<OrderConfirmation>("/orders", { method: "POST", body: { items } });
}
