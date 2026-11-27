import type { CreateOrderItem, OrderConfirmation, Product } from "@/lib/api/types";

export interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  confirmed: OrderConfirmation | null;
}
export type CartAction =
  | { type: "add"; product: Product }
  | { type: "increase" | "decrease" | "remove"; id: string }
  | { type: "orderConfirmed"; order: OrderConfirmation }
  | { type: "dismiss" };
export const initialCart: CartState = { items: [], confirmed: null };
export const subtotal = (item: CartItem) => item.product.priceCents * item.quantity;
export const total = (items: CartItem[]) => items.reduce((sum, item) => sum + subtotal(item), 0);
export const itemCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0);
export const validCart = (items: CartItem[]) =>
  items.length > 0 &&
  items.every(
    (item) =>
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= 99 &&
      Number.isInteger(item.product.priceCents) &&
      item.product.priceCents >= 0,
  );

export function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === "dismiss") return { ...state, confirmed: null };
  if (action.type === "orderConfirmed") {
    if (!validCart(state.items)) return state;
    return { items: [], confirmed: action.order };
  }
  const productId = action.type === "add" ? action.product.id : action.id;
  const existing = state.items.find((item) => item.product.id === productId);
  if (action.type === "remove")
    return { ...state, items: state.items.filter((item) => item.product.id !== productId) };
  if (action.type === "decrease")
    return {
      ...state,
      items: state.items
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    };
  if (existing) {
    if (existing.quantity >= 99) return state;
    return {
      ...state,
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    };
  }
  if (action.type !== "add") return state;
  return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
}

export function orderItemsFromCart(items: CartItem[]): CreateOrderItem[] {
  return items.map(({ product, quantity }) => ({ productId: product.id, quantity }));
}
