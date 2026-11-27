import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useReducer, useState } from "react";
import {
  ArrowDown,
  Beef,
  Check,
  ChevronRight,
  CupSoda,
  IceCreamBowl,
  Leaf,
  ShoppingBag,
  Sparkles,
  Sprout,
  Utensils,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductCard } from "@/components/products/product-card";
import { CartContent } from "@/components/cart/cart-content";
import { filterProducts } from "@/data/products";
import { getCategories } from "@/lib/api/categories";
import { ApiClientError } from "@/lib/api/client";
import { createOrder } from "@/lib/api/orders";
import { getProducts } from "@/lib/api/products";
import type { Category, Product } from "@/lib/api/types";
import { cartReducer, initialCart, itemCount, orderItemsFromCart, validCart } from "@/lib/cart";

type CatalogState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; categories: Category[]; products: Product[] };

function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiClientError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taverna do Bosque | Sabores & aventuras" },
      {
        name: "description",
        content:
          "Explore oito sabores artesanais, escolha seus favoritos e monte um pedido demonstrativo na Taverna do Bosque.",
      },
      { property: "og:title", content: "Taverna do Bosque | Sabores & aventuras" },
      {
        property: "og:description",
        content:
          "Pratos grelhados, poções refrescantes e acompanhamentos em um cardápio de fantasia original.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categoryIcons: Record<string, LucideIcon> = {
  all: Utensils,
  mains: Beef,
  drinks: CupSoda,
  sides: Wheat,
  desserts: IceCreamBowl,
};

function Index() {
  const [catalog, setCatalog] = useState<CatalogState>({ status: "loading" });
  const [category, setCategory] = useState("all");
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.all([getCategories(controller.signal), getProducts(controller.signal)])
      .then(([loadedCategories, loadedProducts]) => {
        setCatalog({
          status: "success",
          categories: loadedCategories,
          products: loadedProducts,
        });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted)
          setCatalog({
            status: "error",
            message: errorMessage(error, "Não foi possível carregar o cardápio."),
          });
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(timeout);
  }, [notice]);
  const categories =
    catalog.status === "success"
      ? [{ id: "all", name: "Todos", slug: "all" }, ...catalog.categories]
      : [{ id: "all", name: "Todos", slug: "all" }];
  const products = catalog.status === "success" ? catalog.products : [];
  const filtered = filterProducts(products, category);
  const featuredProducts = products.filter((product) => product.featured);
  const count = itemCount(cart.items);
  function explore() {
    document.getElementById("cardapio")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  function addProduct(product: Product) {
    if (cart.items.some((item) => item.product.id === product.id && item.quantity >= 99)) {
      setNotice("Limite máximo de 99 unidades por produto.");
      return;
    }
    dispatch({ type: "add", product });
    setNotice(`${product.name} adicionado à sacola!`);
  }
  async function submitOrder() {
    if (!validCart(cart.items) || isSubmitting) return;
    setIsSubmitting(true);
    setOrderError(null);

    try {
      const order = await createOrder(orderItemsFromCart(cart.items));
      dispatch({ type: "orderConfirmed", order });
      setNotice("Pedido confirmado pela Taverna!");
    } catch (error) {
      setOrderError(errorMessage(error, "Não foi possível registrar o pedido."));
    } finally {
      setIsSubmitting(false);
    }
  }
  function changeOpen(value: boolean) {
    setOpen(value);
    if (!value) {
      dispatch({ type: "dismiss" });
      setOrderError(null);
    }
  }
  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <header className="site-header">
        <div className="page-width flex h-20 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="brand-mark">
              <Sprout size={25} strokeWidth={1.4} />
            </div>
            <div>
              <div className="brand-name">Taverna do Bosque</div>
              <div className="eyebrow mt-1 text-gold">SABORES & AVENTURAS</div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Button variant="link" className="header-nav text-ivory" onClick={explore}>
              Nosso cardápio
            </Button>
            <DialogTrigger asChild>
              <Button
                variant="header"
                size="lg"
                className="px-3 sm:px-5"
                aria-label={`Abrir sacola, ${count} itens`}
              >
                <ShoppingBag size={17} />
                <span className="hidden sm:inline">Sua sacola</span>
                <span
                  className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold text-forest-deep px-1 text-xs font-semibold"
                  data-testid="cart-count"
                >
                  {count}
                </span>
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </header>
      <main>
        <section className="hero" aria-labelledby="tavern-title">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" />
          <div className="page-width">
            <div className="hero-copy">
              <div className="eyebrow flex items-center gap-2 text-gold">
                <Sparkles size={14} /> UM REFÚGIO PARA A SUA FOME
              </div>
              <h1 id="tavern-title">
                Taverna do Bosque
                <br />
                <em>Uma deliciosa aventura.</em>
              </h1>
              <p className="hero-description">
                Sabores artesanais, ingredientes selecionados e uma pitada de magia. Sente-se à mesa
                e escolha seu próximo favorito.
              </p>
              <Button variant="tavern" size="lg" className="mt-6" onClick={explore}>
                Explorar o cardápio <ArrowDown size={16} />
              </Button>
              <div className="hero-foot">
                <span className="flex gap-1.5 items-center">
                  <Leaf size={13} /> Feito com ingredientes frescos
                </span>
                <span className="flex gap-1.5 items-center">
                  <Sparkles size={13} /> Sabor artesanal
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="featured-section" aria-labelledby="featured-title">
          <div className="page-width">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="eyebrow mb-2 text-gold">ESCOLHIDOS A DEDO</div>
                <h2 id="featured-title" className="section-heading">
                  Tesouros da taverna
                </h2>
              </div>
              <div className="ornament hidden sm:flex">
                <Sparkles size={19} />
              </div>
            </div>
            <div className="featured-grid">
              {catalog.status === "loading" && (
                <p role="status">Carregando os produtos em destaque…</p>
              )}
              {catalog.status === "success" &&
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} featured onAdd={addProduct} />
                ))}
            </div>
          </div>
        </section>
        <section className="catalog-section" id="cardapio" aria-labelledby="catalog-title">
          <div className="page-width">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="eyebrow mb-2 text-muted-foreground">ESCOLHA SEUS FAVORITOS</div>
                <h2 id="catalog-title" className="section-heading">
                  Nosso cardápio
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Para cada fome, um novo encanto.
                </p>
              </div>
              <span className="text-xs text-muted-foreground pb-1 whitespace-nowrap">
                {catalog.status === "success"
                  ? `${filtered.length} produtos`
                  : catalog.status === "loading"
                    ? "Carregando..."
                    : ""}
              </span>
            </div>
            <nav className="category-list" aria-label="Categorias do cardápio">
              {categories.map((item) => {
                const Icon = categoryIcons[item.slug] ?? Utensils;
                return (
                  <Button
                    key={item.slug}
                    variant={category === item.slug ? "selected" : "category"}
                    size="lg"
                    aria-pressed={category === item.slug}
                    disabled={catalog.status !== "success"}
                    onClick={() => setCategory(item.slug)}
                  >
                    <Icon size={16} />
                    {item.name}
                    {category === item.slug && <Check size={12} />}
                  </Button>
                );
              })}
            </nav>
            {catalog.status === "loading" && (
              <p role="status" className="py-12 text-center text-muted-foreground">
                Carregando cardápio...
              </p>
            )}
            {catalog.status === "error" && (
              <div role="alert" className="py-12 text-center text-muted-foreground">
                <p>O cardápio está temporariamente indisponível.</p>
                <p className="mt-2 text-sm">{catalog.message}</p>
              </div>
            )}
            {catalog.status === "success" && filtered.length > 0 && (
              <div className="catalog-grid" data-testid="catalog">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={addProduct} />
                ))}
              </div>
            )}
            {catalog.status === "success" && products.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">
                Nenhum produto está disponível no momento.
              </p>
            )}
            {catalog.status === "success" && products.length > 0 && filtered.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">
                Nenhum produto encontrado nesta categoria.
              </p>
            )}
            <div className="mt-9 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <Leaf size={14} />
              <span>Feito com cuidado. Servido com um toque de magia.</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="page-width footer-inner flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Sprout className="text-gold" size={24} />
            <div>
              <div className="font-display text-xl">Taverna do Bosque</div>
              <p className="text-xs text-ivory/60 mt-1">Um bom sabor merece uma boa história.</p>
            </div>
          </div>
          <p className="text-xs text-ivory/60">Estabelecimento fictício · Pedidos demonstrativos</p>
          <Button variant="link" className="text-gold" onClick={explore}>
            Voltar ao cardápio <ChevronRight size={15} />
          </Button>
        </div>
      </footer>
      <DialogContent className="cart-dialog">
        <CartContent
          state={cart}
          dispatch={dispatch}
          notify={setNotice}
          onConfirm={() => void submitOrder()}
          isSubmitting={isSubmitting}
          errorMessage={orderError}
        />
      </DialogContent>
      <div role="status" aria-live="polite" aria-atomic="true">
        {notice && (
          <div className="add-notice flex items-center gap-2">
            <Check size={15} />
            <span>{notice}</span>
          </div>
        )}
      </div>
    </Dialog>
  );
}
