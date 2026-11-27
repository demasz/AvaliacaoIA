import { useState } from "react";
import { Leaf, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money, type Product } from "@/data/products";

type ImageProduct = Pick<Product, "id" | "name" | "imageUrl">;

export function ProductImage({
  product,
  className,
}: {
  product: ImageProduct;
  className?: string;
}) {
  const [failed, setFailed] = useState(product.imageUrl === null);
  return failed ? (
    <div
      className={`${className ?? ""} grid place-items-center bg-muted text-forest`}
      role="img"
      aria-label={product.name}
    >
      <Leaf size={40} />
    </div>
  ) : (
    <img
      src={product.imageUrl ?? ""}
      alt={product.name}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
export function ProductCard({
  product,
  featured = false,
  onAdd,
}: {
  product: Product;
  featured?: boolean;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className={featured ? "featured-card" : "product-card"}>
      <ProductImage product={product} className={featured ? "" : "product-card-image"} />
      <div className={featured ? "featured-content" : "product-card-content"}>
        <span className="eyebrow mb-2 flex items-center gap-1.5 text-muted-foreground">
          {featured && <Sparkles size={12} />}
          {featured ? product.featuredLabel : product.category.name}
        </span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description mt-2 mb-4">{product.description}</p>
        <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-2">
          <span className="price">{money(product.priceCents)}</span>
          <Button
            variant={featured ? "tavern" : "secondary"}
            size={featured ? "default" : "icon"}
            title={`Adicionar ${product.name}`}
            aria-label={`Adicionar ${product.name}`}
            onClick={() => onAdd(product)}
          >
            <Plus />
            {featured && "Adicionar"}
          </Button>
        </div>
      </div>
    </article>
  );
}
