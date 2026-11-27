import { Order, OrderItem, Product } from "../../models/index.ts";
import type { CreateOrderInput, OrderDto } from "../../types/api.ts";
import { HttpError } from "../../utils/http-error.ts";
import { sequelize } from "../../database/connection.ts";

const MAX_INTEGER_CENTS = 2_147_483_647;

export async function createOrder(input: CreateOrderInput): Promise<OrderDto> {
  return sequelize.transaction(async (transaction) => {
    const products = await Product.findAll({
      where: { id: input.items.map((item) => item.productId) },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    const productsById = new Map(products.map((product) => [product.id, product]));

    for (const item of input.items) {
      const product = productsById.get(item.productId);
      if (!product) {
        throw new HttpError(404, "PRODUCT_NOT_FOUND", "Um ou mais produtos não foram encontrados.");
      }
      if (!product.active) {
        throw new HttpError(
          409,
          "PRODUCT_UNAVAILABLE",
          "Um ou mais produtos não estão disponíveis.",
        );
      }
    }

    const itemSnapshots = input.items.map((item) => {
      const product = productsById.get(item.productId);
      if (!product) throw new Error("Produto validado não encontrado durante o cálculo.");
      const subtotalCents = product.priceCents * item.quantity;
      if (!Number.isSafeInteger(subtotalCents) || subtotalCents > MAX_INTEGER_CENTS) {
        throw new HttpError(
          422,
          "ORDER_TOTAL_TOO_LARGE",
          "O valor do pedido excede o limite permitido.",
        );
      }
      return {
        productId: product.id,
        productName: product.name,
        unitPriceCents: product.priceCents,
        quantity: item.quantity,
        subtotalCents,
      };
    });
    const totalCents = itemSnapshots.reduce((sum, item) => sum + item.subtotalCents, 0);

    if (!Number.isSafeInteger(totalCents) || totalCents > MAX_INTEGER_CENTS) {
      throw new HttpError(
        422,
        "ORDER_TOTAL_TOO_LARGE",
        "O valor do pedido excede o limite permitido.",
      );
    }

    const order = await Order.create({ status: "CONFIRMED", totalCents }, { transaction });
    const now = new Date();
    const createdItems = await OrderItem.bulkCreate(
      itemSnapshots.map((item) => ({
        ...item,
        orderId: order.id,
        createdAt: now,
        updatedAt: now,
      })),
      { transaction, validate: true, returning: true },
    );

    return {
      id: order.id,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      items: createdItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        unitPriceCents: item.unitPriceCents,
        quantity: item.quantity,
        subtotalCents: item.subtotalCents,
      })),
      totalCents: order.totalCents,
    };
  });
}
