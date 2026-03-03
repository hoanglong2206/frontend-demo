import type { ApiErrorResponseDTO } from "@/infrastructure/http/api-client.types";

export class HttpError extends Error {
	constructor(
		public readonly statusCode: number,
		public readonly data: ApiErrorResponseDTO,
	) {
		super(data.message);
		this.name = "HttpError";
		Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
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

	get isConflict(): boolean {
		return this.statusCode === 409;
	}

	get isValidationError(): boolean {
		return this.statusCode === 422;
	}

	get isRateLimitExceeded(): boolean {
		return this.statusCode === 429;
	}

	get isServerError(): boolean {
		return this.statusCode >= 500 && this.statusCode < 600;
	}

	get validationErrors(): Record<string, string[]> {
		return this.data.detail ?? {};
	}

	override toString(): string {
		return `HttpError: ${this.statusCode} - ${this.message}`;
	}
}

export function isHttpError(error: unknown): error is HttpError {
	return error instanceof HttpError;
}

export function isHttpErrorWithStatus(
	error: unknown,
	status: number | number[],
): error is HttpError {
	if (!isHttpError(error)) return false;
	if (Array.isArray(status)) {
		return status.includes(error.statusCode);
	}
	return error.statusCode === status;
}

export function createHttpError(status: number, data: unknown): HttpError {
	const body: ApiErrorResponseDTO = isApiErrorShape(data)
		? data
		: {
				code: `HTTP_${status}`,
				message: getDefaultMessage(status),
				timestamp: new Date().toISOString(),
			};
	return new HttpError(status, body);
}

function isApiErrorShape(data: unknown): data is ApiErrorResponseDTO {
	return (
		typeof data === "object" &&
		data !== null &&
		typeof (data as ApiErrorResponseDTO).code === "string" &&
		typeof (data as ApiErrorResponseDTO).message === "string"
	);
}

function getDefaultMessage(status: number): string {
	const messages: Record<number, string> = {
		400: "Bad request",
		401: "Authentication required",
		403: "You do not have permission to perform this action",
		404: "The requested resource was not found",
		409: "This action conflicts with existing data",
		422: "Validation failed",
		429: "Too many requests. Please slow down.",
		500: "An unexpected server error occurred",
		503: "Service temporarily unavailable",
	};
	return messages[status] ?? `HTTP error ${status}`;
}
