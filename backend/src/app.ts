import cors from "cors";
import express from "express";
import helmet from "helmet";
import { getFrontendOrigins } from "./config/env.ts";
import { errorHandler } from "./middlewares/error-handler.ts";
import { createApiRouter } from "./routes/api.routes.ts";
import type { ApiServices } from "./types/api.ts";
import { HttpError } from "./utils/http-error.ts";

export function createApp(services: ApiServices): express.Express {
  const app = express();
  const allowedOrigins = new Set(getFrontendOrigins());

  app.disable("x-powered-by");
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }
        callback(
          new HttpError(403, "ORIGIN_NOT_ALLOWED", "A origem da requisição não é permitida."),
        );
      },
    }),
  );
  app.use(helmet());
  app.use(express.json({ limit: "16kb" }));
  app.use("/api", createApiRouter(services));
  app.use((_request, _response, next) => {
    next(new HttpError(404, "ROUTE_NOT_FOUND", "A rota solicitada não foi encontrada."));
  });
  app.use(errorHandler);

  return app;
}
