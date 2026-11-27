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
  onConfirm,
  isSubmitting,
  errorMessage,
}: {
  state: CartState;
  dispatch: (action: CartAction) => void;
  notify: (text: string) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  errorMessage: string | null;
}) {
  const confirmed = state.confirmed;
  const items = confirmed
    ? confirmed.items.map((item) => ({
        id: item.id,
        product: {
          id: item.productId ?? item.id,
          name: item.productName,
          imageUrl: null,
        },
        unitPriceCents: item.unitPriceCents,
        quantity: item.quantity,
        subtotalCents: item.subtotalCents,
      }))
    : state.items.map((item) => ({
        id: item.product.id,
        product: item.product,
        unitPriceCents: item.product.priceCents,
        quantity: item.quantity,
        subtotalCents: subtotal(item),
      }));
  const itemCountTotal = confirmed
    ? confirmed.items.reduce((sum, item) => sum + item.quantity, 0)
    : itemCount(state.items);
  const totalCents = confirmed ? confirmed.totalCents : total(state.items);
  return (
    <>
      {confirmed ? (
        <>
          <div className="success-symbol">
            <Check size={32} />
          </div>
          <DialogTitle className="section-heading text-center">Pedido confirmado!</DialogTitle>
          <DialogDescription className="mt-3 text-center">
            Seu pedido foi registrado com sucesso.
            <br />
            Esta aplicação não processa pagamentos.
          </DialogDescription>
          <p className="mt-2 text-center text-xs text-muted-foreground">Pedido: {confirmed.id}</p>
        </>
      ) : (
        <>
          <div className="eyebrow mb-2 flex gap-2 items-center text-muted-foreground">
            <Leaf size={13} /> SUA PRÓXIMA AVENTURA
          </div>
          <DialogTitle className="section-heading">Sua sacola</DialogTitle>
          <DialogDescription className="mt-2">
            {itemCountTotal} {itemCountTotal === 1 ? "item selecionado" : "itens selecionados"}
          </DialogDescription>
        </>
      )}
      {items.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag className="mx-auto mb-5 text-forest" size={48} strokeWidth={1.2} />
          <h3 className="product-title">Sua sacola está vazia</h3>
          <p className="product-description mt-3 mb-6">Adicione alguns produtos para continuar.</p>
          <p className="price mb-6">Total: {money(totalCents)}</p>
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
              <div className="cart-row" key={item.id}>
                <ProductImage product={item.product} />
                <div>
                  <h3 className="product-title">{item.product.name}</h3>
                  <p className="product-description mt-1">
                    {money(item.unitPriceCents)} por unidade
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting || item.quantity >= 99}
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
                  <span className="price">{money(item.subtotalCents)}</span>
                  {!confirmed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remover ${item.product.name}`}
                      title="Remover produto"
                      disabled={isSubmitting}
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
              <span className="price text-2xl">{money(totalCents)}</span>
            </div>
            {confirmed ? (
              <DialogClose asChild>
                <Button variant="secondary" size="lg" className="w-full">
                  Voltar ao cardápio <ArrowRight />
                </Button>
              </DialogClose>
            ) : (
              <>
                {errorMessage && (
                  <p role="alert" className="mb-3 text-sm text-destructive">
                    {errorMessage}
                  </p>
                )}
                <Button
                  variant="tavern"
                  size="lg"
                  className="w-full"
                  disabled={!validCart(state.items) || isSubmitting}
                  onClick={onConfirm}
                >
                  {isSubmitting ? "Enviando pedido..." : "Confirmar pedido"} <ArrowRight />
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
