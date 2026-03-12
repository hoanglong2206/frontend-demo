import type { ApiErrorResponseDTO } from "@/infrastructure/http/api-client.types";

export class HttpError extends Error {
	constructor(
		public readonly statusCode: number,
		public readonly data: ApiErrorResponseDTO,
	) {
		super(data.error.message);
		this.name = "HttpError";
	}
}

export function isHttpError(err: unknown): err is HttpError {
	return err instanceof HttpError;
}

export function createHttpError(status: number, data: unknown): HttpError {
	return new HttpError(status, data as ApiErrorResponseDTO);
}
