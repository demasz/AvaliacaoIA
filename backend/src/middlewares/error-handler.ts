import type { ErrorRequestHandler } from "express";
import {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from "sequelize";
import { env } from "../config/env.ts";
import { HttpError } from "../utils/http-error.ts";

interface BodyParserError extends Error {
  status?: number;
  type?: string;
}

function isBodyParserError(error: unknown): error is BodyParserError {
  return error instanceof Error && "type" in error;
}

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({
      error: { code: error.code, message: error.message, details: error.details },
    });
    return;
  }

  if (isBodyParserError(error)) {
    if (error.type === "entity.too.large") {
      response.status(413).json({
        error: {
          code: "PAYLOAD_TOO_LARGE",
          message: "A requisição excede o limite permitido.",
          details: [],
        },
      });
      return;
    }
    if (error.type === "entity.parse.failed") {
      response.status(400).json({
        error: {
          code: "INVALID_JSON",
          message: "O corpo da requisição não contém JSON válido.",
          details: [],
        },
      });
      return;
    }
  }

  if (error instanceof UniqueConstraintError) {
    response.status(409).json({
      error: {
        code: "DATA_CONFLICT",
        message: "Os dados conflitam com um registro existente.",
        details: [],
      },
    });
    return;
  }

  if (error instanceof ForeignKeyConstraintError) {
    response.status(409).json({
      error: {
        code: "REFERENCE_CONFLICT",
        message: "A referência informada não é válida.",
        details: [],
      },
    });
    return;
  }

  if (error instanceof ValidationError) {
    response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "A requisição contém dados inválidos.",
        details: [],
      },
    });
    return;
  }

  if (error instanceof DatabaseError && env.NODE_ENV !== "production") {
    console.error("Falha inesperada no banco de dados:", error);
  } else if (env.NODE_ENV !== "production") {
    console.error("Falha inesperada na API:", error);
  }

  response.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "Ocorreu um erro interno.", details: [] },
  });
};
