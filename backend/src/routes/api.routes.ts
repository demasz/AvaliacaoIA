import { Router } from "express";
import rateLimit from "express-rate-limit";
import { env } from "../config/env.ts";
import { createOrderSchema } from "../schemas/orders.ts";
import { parseOrThrow } from "../schemas/common.ts";
import { productFilterSchema, productIdSchema } from "../schemas/products.ts";
import type { ApiServices } from "../types/api.ts";

export function createApiRouter(services: ApiServices): Router {
  const router = Router();
  const orderLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: env.NODE_ENV === "test" ? 100 : 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_request, response) => {
      response.status(429).json({
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Muitas tentativas de confirmação. Aguarde antes de tentar novamente.",
          details: [],
        },
      });
    },
  });

  router.get("/health", (_request, response) => {
    response.json({ status: "ok", service: "cardapio-api" });
  });

  router.get("/categories", async (_request, response) => {
    response.json({ data: await services.listCategories() });
  });

  router.get("/products", async (request, response) => {
    const parsed = parseOrThrow(productFilterSchema, request.query);
    const filters = {
      ...(parsed.category === undefined ? {} : { category: parsed.category }),
      ...(parsed.featured === undefined ? {} : { featured: parsed.featured }),
    };
    response.json({ data: await services.listProducts(filters) });
  });

  router.get("/products/:id", async (request, response) => {
    const { id } = parseOrThrow(productIdSchema, request.params);
    response.json({ data: await services.getProduct(id) });
  });

  router.post("/orders", orderLimiter, async (request, response) => {
    const input = parseOrThrow(createOrderSchema, request.body);
    const order = await services.createOrder(input);
    response.status(201).json({ data: order });
  });

  return router;
}
