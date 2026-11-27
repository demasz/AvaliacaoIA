import { products, type Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  confirmed: CartItem[] | null;
}
export type CartAction =
  | { type: "add" | "increase" | "decrease" | "remove"; id: string }
  | { type: "clear" | "confirm" | "dismiss" };
export const initialCart: CartState = { items: [], confirmed: null };
export const subtotal = (item: CartItem) => item.product.price * item.quantity;
export const total = (items: CartItem[]) => items.reduce((sum, item) => sum + subtotal(item), 0);
export const itemCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0);
export const validCart = (items: CartItem[]) =>
  items.length > 0 &&
  items.every(
    (item) =>
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      Number.isInteger(item.product.price) &&
      item.product.price >= 0,
  );

export function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === "dismiss") return { ...state, confirmed: null };
  if (action.type === "clear") return { ...state, items: [] };
  if (action.type === "confirm") {
    if (!validCart(state.items)) return state;
    return {
      items: [],
      confirmed: state.items.map((item) => ({
        product: { ...item.product },
        quantity: item.quantity,
      })),
    };
  }
  if (!("id" in action)) return state;
  const existing = state.items.find((item) => item.product.id === action.id);
  if (action.type === "remove")
    return { ...state, items: state.items.filter((item) => item.product.id !== action.id) };
  if (action.type === "decrease")
    return {
      ...state,
      items: state.items
        .map((item) =>
          item.product.id === action.id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    };
  if (existing)
    return {
      ...state,
      items: state.items.map((item) =>
        item.product.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    };
  if (action.type === "increase") return state;
  const product = products.find((product) => product.id === action.id);
  if (!product) return state;
  return { ...state, items: [...state.items, { product, quantity: 1 }] };
}
