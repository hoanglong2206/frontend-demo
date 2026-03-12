// ── Request DTOs ──

export interface LoginRequestDTO {
	email: string;
	password: string;
}

export interface CreateAccountDTO {
	fullName: string;
	email: string;
	password: string;
	account_token: string; // For users registering via email OTP verification flow
}

export interface ForgotPasswordDTO {
	email: string;
}

export interface RegisterEmailDTO {
	email: string;
}

export interface ResendEmailOtpDTO {
	email: string;
}

export interface VerifyEmailOtpDTO {
	email: string;
	otp: string;
	verification_token: string;
}

// ── Response DTOs (server shape, snake_case) ──

export interface UserDTO {
	id: string;
	email: string;
	is_verified: boolean;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface SessionDTO {
	access_token: string;
	refresh_token: string;
	expires_at: number; // Unix timestamp (ms)
}

export interface RegisterEmailResponseDTO {
	verification_token: string; // Temporary token for OTP verification flow
	expires_at: number; // Unix timestamp (ms)
}

export interface VerifyEmailOtpResponseDTO {
	verified: boolean;
	account_token: string; // Temporary token for account verification flow
}
