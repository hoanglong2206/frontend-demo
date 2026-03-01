import { AUTH_CONFIG } from "@/core/config/constants";
import type { Session, User } from "./auth.types";

export function isSessionExpired(session: Session | null): boolean {
	if (!session) return true;
	return Date.now() >= session.expiresAt - AUTH_CONFIG.SESSION_BUFFER_MS;
}

export function isAuthenticated(session: Session | null): boolean {
	return session !== null && !isSessionExpired(session);
}

export function isEmailVerified(user: User | null): boolean {
	if (!user) return false;
	return user.isVerified;
}

export function getRemainingAttempts(attempts: number): number {
	return Math.max(AUTH_CONFIG.OTP_MAX_ATTEMPTS - attempts, 0);
}

export function isOtpBlocked(attempts: number): boolean {
	return attempts >= AUTH_CONFIG.OTP_MAX_ATTEMPTS;
}

export function canResendOtp(
	secondsRemaining: number,
	isBlocked: boolean,
): boolean {
	return secondsRemaining <= 0 && !isBlocked;
}

export function getPasswordStrength(
	password: string,
): "weak" | "medium" | "strong" {
	let score = 0;
	if (password.length >= 8) score++;
	if (password.length >= 12) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[a-z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	if (score <= 2) return "weak";
	if (score <= 4) return "medium";
	return "strong";
}
