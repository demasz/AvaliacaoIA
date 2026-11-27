export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
}

export interface ProductDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  category: CategoryDto;
  imageUrl: string | null;
  featured: boolean;
  featuredLabel: string | null;
}

export interface ProductFilters {
  category?: string;
  featured?: boolean;
}

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
}

export interface OrderItemDto {
  id: string;
  productId: string | null;
  productName: string;
  unitPriceCents: number;
  quantity: number;
  subtotalCents: number;
}

export interface OrderDto {
  id: string;
  status: "CONFIRMED";
  createdAt: string;
  items: OrderItemDto[];
  totalCents: number;
}

export interface ApiServices {
  listCategories(): Promise<CategoryDto[]>;
  listProducts(filters: ProductFilters): Promise<ProductDto[]>;
  getProduct(id: string): Promise<ProductDto>;
  createOrder(input: CreateOrderInput): Promise<OrderDto>;
}
