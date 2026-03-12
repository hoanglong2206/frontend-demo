// ── Generic API response envelope ──
export interface ApiResponse<T> {
	data: T;
	message?: string;
}

// ── Simple message response ──
export interface MessageResponseDTO {
	message: string;
}

// ── Paginated response wrapper ──
export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export interface CursorPaginatedResponse<T> {
	data: T[];
	nextCursor?: string;
	prevCursor?: string;
	hasMore: boolean;
}

export interface PaginationParams {
	page?: number;
	pageSize?: number;
}

export interface CursorParams {
	cursor?: string;
	limit?: number;
	direction?: "forward" | "backward";
}

// ── Server error shape (used by interceptors & HttpError) ──
export interface ApiErrorResponseDTO {
	success: false;
	error: {
		statusCode: number;
		message: string;
	};
	meta: {
		timestamp: string;
		path: string;
	};
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP
// ─────────────────────────────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig {
	headers?: Record<string, string>;
	signal?: AbortSignal;
	timeout?: number;
	withCredentials?: boolean;
}
