export interface ErrorDetail {
  path: string;
  message: string;
}

export class HttpError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details: ErrorDetail[];

  constructor(status: number, code: string, message: string, details: ErrorDetail[] = []) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
