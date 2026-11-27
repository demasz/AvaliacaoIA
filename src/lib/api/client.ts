import type { ApiErrorPayload } from "./types";

const API_BASE_URL = (import.meta.env["VITE_API_URL"] ?? "http://localhost:3001/api").replace(
  /\/+$/,
  "",
);
const REQUEST_TIMEOUT_MS = 10_000;

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number | undefined,
    public readonly code: string | undefined,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseErrorPayload(value: unknown): ApiErrorPayload {
  if (!isRecord(value) || !isRecord(value["error"])) return {};
  const error: ApiErrorPayload["error"] = {};
  if (typeof value["error"]["code"] === "string") error.code = value["error"]["code"];
  if (typeof value["error"]["message"] === "string") error.message = value["error"]["message"];
  return { error };
}

export async function apiRequest<T>(
  path: string,
  options: { method?: "GET" | "POST"; body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  const abortFromCaller = () => controller.abort();

  if (options.signal?.aborted) controller.abort();
  options.signal?.addEventListener("abort", abortFromCaller, { once: true });

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/json",
        ...(options.body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
      signal: controller.signal,
    });

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new ApiClientError("A API retornou uma resposta inválida.", response.status, undefined);
    }

    if (!response.ok) {
      const error = parseErrorPayload(payload).error;
      throw new ApiClientError(
        error?.message ?? "Não foi possível concluir a solicitação.",
        response.status,
        error?.code,
      );
    }

    if (!isRecord(payload) || !("data" in payload)) {
      throw new ApiClientError(
        "A API retornou uma resposta fora do formato esperado.",
        response.status,
        undefined,
      );
    }

    return payload["data"] as T;
  } catch (error) {
    if (error instanceof ApiClientError || options.signal?.aborted) throw error;
    if (timedOut) {
      throw new ApiClientError(
        "A API demorou para responder. Tente novamente.",
        undefined,
        "TIMEOUT",
      );
    }
    if (error instanceof TypeError) {
      throw new ApiClientError(
        "Não foi possível conectar ao servidor do cardápio. Verifique se a API está em execução.",
        undefined,
        "NETWORK_ERROR",
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", abortFromCaller);
  }
}
