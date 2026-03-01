import type { ApiErrorResponseDTO } from "@/infrastructure/http/api-client.types";

export class HttpError extends Error {
	constructor(
		public readonly statusCode: number,
		message: string,
		public readonly data?: ApiErrorResponseDTO | unknown,
	) {
		super(message);
		this.name = "HttpError";
	}

	get isUnauthorized(): boolean {
		return this.statusCode === 401;
	}

	get isForbidden(): boolean {
		return this.statusCode === 403;
	}

	get isNotFound(): boolean {
		return this.statusCode === 404;
	}

	get isValidationError(): boolean {
		return this.statusCode === 422;
	}

	get isServerError(): boolean {
		return this.statusCode >= 500 && this.statusCode < 600;
	}
}
