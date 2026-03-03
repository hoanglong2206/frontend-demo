// ── Domain models (client-side, camelCase) ──

export interface User {
	id: string;
	email: string;
	isVerified: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Session {
	accessToken: string;
	refreshToken: string;
	expiresAt: number; // Unix timestamp (ms)
}
