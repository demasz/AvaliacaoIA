export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  category: Category;
  imageUrl: string | null;
  featured: boolean;
  featuredLabel: string | null;
}

export interface OrderItemSnapshot {
  id: string;
  productId: string | null;
  productName: string;
  unitPriceCents: number;
  quantity: number;
  subtotalCents: number;
}

export interface OrderConfirmation {
  id: string;
  status: "CONFIRMED";
  createdAt: string;
  items: OrderItemSnapshot[];
  totalCents: number;
}

export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface ApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
  };
}
