// ── Domain models (client-side, camelCase) ──

export interface User {
	id: string;
	fullName: string;
	email: string;
	avatarUrl: string | null;
	gender: "male" | "female" | "other" | null;
	dateOfBirth: string | null;
	isVerified: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Session {
	accessToken: string;
	refreshToken: string;
	expiresAt: number; // Unix timestamp (ms)
}
