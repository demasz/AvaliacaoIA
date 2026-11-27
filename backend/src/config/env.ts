import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  FRONTEND_ORIGINS: z.string().default("http://localhost:3000,http://127.0.0.1:3000"),
});

export const env = environmentSchema.parse(process.env);

function parseDatabaseUrl(value: string | undefined, variable: string): string {
  if (!value) {
    throw new Error(`${variable} é obrigatória para iniciar ou executar esta operação.`);
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${variable} deve ser uma URL PostgreSQL válida.`);
  }

  if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
    throw new Error(`${variable} deve usar o protocolo postgres:// ou postgresql://.`);
  }

  return value;
}

export function getDatabaseUrl(): string {
  if (env.NODE_ENV === "test") {
    return parseDatabaseUrl(process.env.DATABASE_URL_TEST, "DATABASE_URL_TEST");
  }

  return parseDatabaseUrl(process.env.DATABASE_URL, "DATABASE_URL");
}

export function getTestDatabaseUrl(): string {
  const value = parseDatabaseUrl(process.env.DATABASE_URL_TEST, "DATABASE_URL_TEST");
  const databaseName = decodeURIComponent(new URL(value).pathname.replace(/^\/+/, ""));

  if (!/(^|_)test$/i.test(databaseName)) {
    throw new Error("DATABASE_URL_TEST deve apontar para um banco cujo nome termine em _test.");
  }

  return value;
}

export function getFrontendOrigins(): string[] {
  const origins = env.FRONTEND_ORIGINS.split(",").map((origin) => origin.trim());
  if (origins.length === 0 || origins.some((origin) => origin.length === 0 || origin === "*")) {
    throw new Error("FRONTEND_ORIGINS deve conter origens explícitas separadas por vírgula.");
  }

  for (const origin of origins) {
    let parsed: URL;
    try {
      parsed = new URL(origin);
    } catch {
      throw new Error(`Origem inválida em FRONTEND_ORIGINS: ${origin}`);
    }

    if (parsed.origin !== origin) {
      throw new Error(`FRONTEND_ORIGINS deve conter origens sem caminhos: ${origin}`);
    }
  }

  return origins;
}
