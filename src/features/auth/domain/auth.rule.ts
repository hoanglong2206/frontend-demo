import type { Session, User } from "./auth.types";

const SESSION_BUFFER_MS = 60_000; // 1 minute buffer before actual expiry

export function isSessionExpired(session: Session | null): boolean {
	if (!session) return true;
	return Date.now() >= session.expiresAt - SESSION_BUFFER_MS;
}

export function isAuthenticated(session: Session | null): boolean {
	return session !== null && !isSessionExpired(session);
}

export function isEmailVerified(user: User | null): boolean {
	if (!user) return false;
	return user.isVerified;
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
