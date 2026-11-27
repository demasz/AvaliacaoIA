import { Check, Leaf, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProductImage } from "@/components/products/product-card";
import { money } from "@/data/products";
import { itemCount, subtotal, total, validCart, type CartAction, type CartState } from "@/lib/cart";

export function CartContent({
  state,
  dispatch,
  notify,
}: {
  state: CartState;
  dispatch: (action: CartAction) => void;
  notify: (text: string) => void;
}) {
  const confirmed = state.confirmed;
  const items = confirmed ?? state.items;
  return (
    <>
      {confirmed ? (
        <>
          <div className="success-symbol">
            <Check size={32} />
          </div>
          <DialogTitle className="section-heading text-center">Pedido confirmado!</DialogTitle>
          <DialogDescription className="mt-3 text-center">
            Seu pedido foi confirmado com sucesso!
            <br />
            Esta é uma confirmação demonstrativa, sem cobrança.
          </DialogDescription>
        </>
      ) : (
        <>
          <div className="eyebrow mb-2 flex gap-2 items-center text-muted-foreground">
            <Leaf size={13} /> SUA PRÓXIMA AVENTURA
          </div>
          <DialogTitle className="section-heading">Sua sacola</DialogTitle>
          <DialogDescription className="mt-2">
            {itemCount(items)} {itemCount(items) === 1 ? "item selecionado" : "itens selecionados"}
          </DialogDescription>
        </>
      )}
      {items.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag className="mx-auto mb-5 text-forest" size={48} strokeWidth={1.2} />
          <h3 className="product-title">Sua sacola está vazia</h3>
          <p className="product-description mt-3 mb-6">Adicione alguns produtos para continuar.</p>
          <p className="price mb-6">Total: {money(total(items))}</p>
          <DialogClose asChild>
            <Button variant="secondary" size="lg">
              Explorar o cardápio <ArrowRight />
            </Button>
          </DialogClose>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-row" key={item.product.id}>
                <ProductImage product={item.product} />
                <div>
                  <h3 className="product-title">{item.product.name}</h3>
                  <p className="product-description mt-1">
                    {money(item.product.price)} por unidade
                  </p>
                  {confirmed ? (
                    <p className="product-description mt-2">Quantidade: {item.quantity}</p>
                  ) : (
                    <div className="cart-controls">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={`Diminuir ${item.product.name}`}
                        title="Diminuir quantidade"
                        onClick={() => {
                          dispatch({ type: "decrease", id: item.product.id });
                          notify(
                            item.quantity === 1
                              ? "Produto removido do carrinho."
                              : "Quantidade atualizada.",
                          );
                        }}
                      >
                        <Minus />
                      </Button>
                      <span
                        className="w-8 text-center text-sm"
                        aria-label={`Quantidade de ${item.product.name}`}
                      >
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={`Aumentar ${item.product.name}`}
                        title="Aumentar quantidade"
                        onClick={() => {
                          dispatch({ type: "increase", id: item.product.id });
                          notify("Quantidade atualizada.");
                        }}
                      >
                        <Plus />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="price">{money(subtotal(item))}</span>
                  {!confirmed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remover ${item.product.name}`}
                      title="Remover produto"
                      onClick={() => {
                        dispatch({ type: "remove", id: item.product.id });
                        notify("Produto removido do carrinho.");
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <div className="flex items-center justify-between mb-5">
              <span className="font-semibold">Total do pedido</span>
              <span className="price text-2xl">{money(total(items))}</span>
            </div>
            {confirmed ? (
              <DialogClose asChild>
                <Button variant="secondary" size="lg" className="w-full">
                  Voltar ao cardápio <ArrowRight />
                </Button>
              </DialogClose>
            ) : (
              <>
                <Button
                  variant="tavern"
                  size="lg"
                  className="w-full"
                  disabled={!validCart(items)}
                  onClick={() => dispatch({ type: "confirm" })}
                >
                  Confirmar pedido <ArrowRight />
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Pedido demonstrativo. Nenhum pagamento será realizado.
                </p>
                <DialogClose asChild>
                  <Button variant="link" className="w-full mt-2 text-foreground">
                    Continuar escolhendo
                  </Button>
                </DialogClose>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
