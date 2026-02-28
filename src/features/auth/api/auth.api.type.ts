// ── Request DTOs ──

export interface LoginRequestDTO {
	email: string;
	password: string;
}

export interface RegisterRequestDTO {
	fullName: string;
	email: string;
	password: string;
}

export interface ForgotPasswordDTO {
	email: string;
}

export interface SendEmailOtpDTO {
	email: string;
}

export interface ResendEmailOtpDTO {
	email: string;
}

export interface VerifyEmailOtpDTO {
	email: string;
	code: string;
}

// ── Response DTOs (server shape, snake_case) ──

export interface UserDTO {
	id: string;
	full_name: string;
	email: string;
	avatar_url: string | null;
	gender: "male" | "female" | "other" | null;
	date_of_birth: string | null;
	is_verified: boolean;
	created_at: string;
	updated_at: string;
}

export interface SessionDTO {
	user: UserDTO;
	access_token: string;
	refresh_token: string;
	expires_at: number; // Unix timestamp (ms)
}
