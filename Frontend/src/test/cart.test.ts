import { describe, expect, it } from "vitest";
import { filterProducts, money } from "@/data/products";
import type { Category, OrderConfirmation, Product } from "@/lib/api/types";
import {
  cartReducer,
  initialCart,
  itemCount,
  orderItemsFromCart,
  subtotal,
  total,
  validCart,
  type CartState,
} from "@/lib/cart";

const mains: Category = { id: "cat-mains", name: "Pratos principais", slug: "mains" };
const drinks: Category = { id: "cat-drinks", name: "Poções", slug: "drinks" };
const sides: Category = { id: "cat-sides", name: "Acompanhamentos", slug: "sides" };

const products: Product[] = [
  {
    id: "mix-de-carnes",
    slug: "mix-de-carnes",
    name: "Mix de Carnes",
    description: "Carnes grelhadas com vegetais.",
    priceCents: 2500,
    category: mains,
    imageUrl: null,
    featured: true,
    featuredLabel: "Destaque",
  },
  {
    id: "blue-potion",
    slug: "blue-potion",
    name: "Poção Azul",
    description: "Bebida refrescante.",
    priceCents: 800,
    category: drinks,
    imageUrl: null,
    featured: false,
    featuredLabel: null,
  },
  {
    id: "mix-de-cogumelos",
    slug: "mix-de-cogumelos",
    name: "Mix de Cogumelos",
    description: "Cogumelos com ervas.",
    priceCents: 1200,
    category: sides,
    imageUrl: null,
    featured: false,
    featuredLabel: null,
  },
];

const findProduct = (id: string) => products.find((product) => product.id === id);
const add = (state: CartState, id: string) => {
  const product = findProduct(id);
  return product ? cartReducer(state, { type: "add", product }) : state;
};

describe("Regras do cardápio", () => {
  it("filtra produtos por categoria e restaura todos", () => {
    expect(filterProducts(products, "drinks").map((product) => product.id)).toEqual([
      "blue-potion",
    ]);
    expect(filterProducts(products, "all")).toHaveLength(3);
    expect(filterProducts(products, "unknown")).toEqual([]);
    expect(money(8200)).toBe("R$\u00a082,00");
  });

  it("adiciona repetidos sem duplicação e soma unidades", () => {
    const state = add(add(initialCart, "mix-de-carnes"), "mix-de-carnes");
    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.quantity).toBe(2);
    expect(itemCount(state.items)).toBe(2);
  });

  it("incrementa exatamente uma unidade", () => {
    const state = cartReducer(add(initialCart, "blue-potion"), {
      type: "increase",
      id: "blue-potion",
    });
    expect(state.items[0]?.quantity).toBe(2);
    expect(total(state.items)).toBe(1600);
  });

  it("limita cada item a 99 unidades", () => {
    const state = Array.from({ length: 99 }).reduce<CartState>(
      (cart) => add(cart, "blue-potion"),
      initialCart,
    );
    expect(state.items[0]?.quantity).toBe(99);
    expect(add(state, "blue-potion")).toBe(state);
    expect(validCart(state.items)).toBe(true);
  });

  it("reduz exatamente uma unidade e recalcula subtotal", () => {
    const state = cartReducer(add(add(initialCart, "mix-de-carnes"), "mix-de-carnes"), {
      type: "decrease",
      id: "mix-de-carnes",
    });
    const first = state.items[0];
    expect(first?.quantity).toBe(1);
    expect(first && subtotal(first)).toBe(2500);
  });

  it("remove ao diminuir a última unidade, sem quantidade negativa", () => {
    const state = cartReducer(add(initialCart, "mix-de-carnes"), {
      type: "decrease",
      id: "mix-de-carnes",
    });
    expect(state.items).toEqual([]);
    expect(total(state.items)).toBe(0);
    expect(cartReducer(state, { type: "decrease", id: "mix-de-carnes" }).items).toEqual([]);
  });

  it("remove completamente um produto", () => {
    const state = cartReducer(add(add(initialCart, "blue-potion"), "blue-potion"), {
      type: "remove",
      id: "blue-potion",
    });
    expect(state.items).toEqual([]);
  });

  it("calcula somente os identificadores e quantidades enviados à API", () => {
    let state = initialCart;
    for (const id of [
      "mix-de-carnes",
      "mix-de-carnes",
      "blue-potion",
      "mix-de-cogumelos",
      "mix-de-cogumelos",
    ])
      state = add(state, id);
    expect(state.items.map(subtotal)).toEqual([5000, 800, 2400]);
    expect(total(state.items)).toBe(8200);
    expect(orderItemsFromCart(state.items)).toEqual([
      { productId: "mix-de-carnes", quantity: 2 },
      { productId: "blue-potion", quantity: 1 },
      { productId: "mix-de-cogumelos", quantity: 2 },
    ]);
  });

  it("não confirma carrinho vazio", () => {
    expect(validCart([])).toBe(false);
    const order: OrderConfirmation = {
      id: "order-1",
      status: "CONFIRMED",
      createdAt: "2026-01-01T00:00:00.000Z",
      items: [],
      totalCents: 0,
    };
    expect(cartReducer(initialCart, { type: "orderConfirmed", order })).toEqual(initialCart);
  });

  it("rejeita quantidades inválidas", () => {
    const product = products[0];
    if (!product) throw new Error("Produto ausente");
    for (const quantity of [0, -1, 1.5, 100, NaN])
      expect(validCart([{ product, quantity }])).toBe(false);
  });

  it("limpa o carrinho somente após confirmação e mantém o resumo retornado pela API", () => {
    const original = add(add(initialCart, "mix-de-carnes"), "blue-potion");
    const order: OrderConfirmation = {
      id: "order-1",
      status: "CONFIRMED",
      createdAt: "2026-01-01T00:00:00.000Z",
      items: [],
      totalCents: 3300,
    };
    const state = cartReducer(original, { type: "orderConfirmed", order });
    expect(state.items).toEqual([]);
    expect(state.confirmed).toBe(order);
    expect(state.confirmed?.totalCents).toBe(3300);
    const next = add(state, "mix-de-cogumelos");
    expect(total(next.items)).toBe(1200);
    expect(next.confirmed).toBe(order);
  });

  it("filtragem não altera o carrinho e identificadores inválidos não adicionam produtos", () => {
    const state = add(initialCart, "mix-de-carnes");
    filterProducts(products, "drinks");
    expect(state.items[0]?.product.id).toBe("mix-de-carnes");
    expect(itemCount(state.items)).toBe(1);
    expect(add(initialCart, "invalid")).toEqual(initialCart);
  });
});
