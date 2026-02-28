// ── Generic API response envelope ──
export interface ApiResponse<T> {
	data: T;
	message?: string;
}

// ── Paginated response wrapper ──
export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

// ── Server error shape (used by interceptors & HttpError) ──
export interface ApiErrorResponseDTO {
	message: string;
	code?: string;
	/** Field-level validation errors, e.g. { email: ["is required"] } */
	errors?: Record<string, string[]>;
}

// ── Reusable success response carrying only a message ──
export interface MessageResponseDTO {
	message: string;
}
