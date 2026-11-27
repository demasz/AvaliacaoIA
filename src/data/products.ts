import burger from "@/assets/forest-burger.asset.json";
import doubleBurger from "@/assets/double-burger.asset.json";
import blue from "@/assets/blue-potion.asset.json";
import red from "@/assets/red-elixir.asset.json";
import fries from "@/assets/fries.asset.json";
import onions from "@/assets/onion-rings.asset.json";
import dessert from "@/assets/fairy-dessert.asset.json";
import pie from "@/assets/forest-pie.asset.json";

export const categories = [
  { id: "all", name: "Todos" },
  { id: "burgers", name: "Hambúrgueres" },
  { id: "drinks", name: "Bebidas" },
  { id: "sides", name: "Acompanhamentos" },
  { id: "desserts", name: "Sobremesas" },
] as const;
export type Category = (typeof categories)[number]["id"];
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "all">;
  image: string;
  featured?: string;
}
export const products: Product[] = [
  {
    id: "forest-burger",
    name: "Hambúrguer da Floresta",
    description: "Pão artesanal, carne grelhada, cheddar, salada fresca e nosso molho da casa.",
    price: 2500,
    category: "burgers",
    image: burger.url,
    featured: "O favorito da taverna",
  },
  {
    id: "double-burger",
    name: "Smash da Montanha",
    description: "Dois smash burgers, cheddar derretido e bacon crocante no pão brioche.",
    price: 2900,
    category: "burgers",
    image: doubleBurger.url,
  },
  {
    id: "blue-potion",
    name: "Poção Azul",
    description: "Limonada azul bem gelada, com um toque cítrico e refrescante. 400 ml.",
    price: 800,
    category: "drinks",
    image: blue.url,
  },
  {
    id: "red-elixir",
    name: "Elixir de Fogo",
    description: "Frutas vermelhas, limão e um toque de alecrim. Uma mistura encantadora. 400 ml.",
    price: 1000,
    category: "drinks",
    image: red.url,
  },
  {
    id: "fries",
    name: "Batatas da Montanha",
    description: "Batatas douradas e crocantes, finalizadas com sal e alecrim. Porção de 200 g.",
    price: 1200,
    category: "sides",
    image: fries.url,
  },
  {
    id: "onion-rings",
    name: "Anéis de Cebola",
    description: "Anéis de cebola empanados, crocantes por fora e macios por dentro.",
    price: 1400,
    category: "sides",
    image: onions.url,
  },
  {
    id: "fairy-dessert",
    name: "Doce da Fada",
    description: "Delicada panna cotta de baunilha com calda de frutas vermelhas.",
    price: 1100,
    category: "desserts",
    image: dessert.url,
  },
  {
    id: "forest-pie",
    name: "Torta do Bosque",
    description: "Torta de maçã com especiarias e uma generosa bola de sorvete de baunilha.",
    price: 1600,
    category: "desserts",
    image: pie.url,
    featured: "Um final encantador",
  },
];
export function filterProducts(category: string) {
  return category === "all"
    ? products
    : products.filter((product) => product.category === category);
}
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
