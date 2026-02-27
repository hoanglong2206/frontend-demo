export class HttpError extends Error {
	constructor(
		public readonly statusCode: number,
		message: string,
		public readonly data?: unknown,
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
}
