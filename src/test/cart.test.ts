import { describe, expect, it } from "vitest";
import { filterProducts, money, products } from "@/data/products";
import {
  cartReducer,
  initialCart,
  itemCount,
  subtotal,
  total,
  validCart,
  type CartState,
} from "@/lib/cart";

const add = (state: CartState, id: string) => cartReducer(state, { type: "add", id });
describe("Regras do cardápio", () => {
  it("possui pelo menos seis produtos completos, únicos e preços inteiros não negativos", () => {
    expect(products.length).toBeGreaterThanOrEqual(6);
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    for (const p of products) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.image.length).toBeGreaterThan(0);
      expect(p.category.length).toBeGreaterThan(0);
      expect(Number.isInteger(p.price)).toBe(true);
      expect(p.price).toBeGreaterThanOrEqual(0);
    }
  });
  it("filtra categorias por identificador e restaura todos", () => {
    expect(filterProducts("drinks").map((p) => p.id)).toEqual(["blue-potion", "red-elixir"]);
    expect(filterProducts("all")).toHaveLength(8);
    expect(filterProducts("unknown")).toEqual([]);
  });
  it("produtos destacados usam a mesma fonte de dados", () => {
    expect(products.filter((p) => p.featured).map((p) => p.id)).toEqual([
      "forest-burger",
      "forest-pie",
    ]);
  });
  it("adiciona repetidos sem duplicação e soma unidades", () => {
    const state = add(add(initialCart, "forest-burger"), "forest-burger");
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
  it("reduz exatamente uma unidade e recalcula subtotal", () => {
    const state = cartReducer(add(add(initialCart, "forest-burger"), "forest-burger"), {
      type: "decrease",
      id: "forest-burger",
    });
    const first = state.items[0];
    expect(first?.quantity).toBe(1);
    expect(first && subtotal(first)).toBe(2500);
  });
  it("remove ao diminuir a última unidade, sem quantidade negativa", () => {
    const state = cartReducer(add(initialCart, "forest-burger"), {
      type: "decrease",
      id: "forest-burger",
    });
    expect(state.items).toEqual([]);
    expect(total(state.items)).toBe(0);
    expect(cartReducer(state, { type: "decrease", id: "forest-burger" }).items).toEqual([]);
  });
  it("remove completamente um produto", () => {
    const state = cartReducer(add(add(initialCart, "blue-potion"), "blue-potion"), {
      type: "remove",
      id: "blue-potion",
    });
    expect(state.items).toEqual([]);
  });
  it("calcula exemplo da especificação: 2×2500 + 800 + 2×1200 = 8200 centavos", () => {
    let state = initialCart;
    for (const id of ["forest-burger", "forest-burger", "blue-potion", "fries", "fries"])
      state = add(state, id);
    expect(state.items.map(subtotal)).toEqual([5000, 800, 2400]);
    expect(total(state.items)).toBe(8200);
    expect(money(total(state.items))).toBe("R$\u00a082,00");
  });
  it("não confirma carrinho vazio", () => {
    expect(validCart([])).toBe(false);
    expect(cartReducer(initialCart, { type: "confirm" })).toEqual(initialCart);
  });
  it("rejeita quantidades zero, negativas ou fracionárias", () => {
    const product = products[0];
    if (!product) throw new Error("Produto ausente");
    for (const quantity of [0, -1, 1.5, NaN])
      expect(validCart([{ product, quantity }])).toBe(false);
  });
  it("confirma cópia dos dados e limpa carrinho preservando resumo", () => {
    const original = add(add(initialCart, "forest-burger"), "blue-potion");
    const state = cartReducer(original, { type: "confirm" });
    expect(state.items).toEqual([]);
    expect(state.confirmed).toEqual(original.items);
    expect(state.confirmed?.[0]).not.toBe(original.items[0]);
    expect(total(state.confirmed ?? [])).toBe(3300);
    const next = add(state, "fries");
    expect(total(next.items)).toBe(1200);
    expect(total(next.confirmed ?? [])).toBe(3300);
  });
  it("filtragem não altera carrinho", () => {
    const state = add(initialCart, "forest-burger");
    filterProducts("drinks");
    expect(state.items[0]?.product.id).toBe("forest-burger");
    expect(itemCount(state.items)).toBe(1);
  });
  it("identificador inválido não adiciona produto", () => {
    expect(add(initialCart, "invalid")).toEqual(initialCart);
  });
});
