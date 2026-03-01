import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
	fullName: z
		.string()
		.min(1, "Full name is required")
		.min(2, "Full name must be at least 2 characters")
		.max(100, "Full name must be less than 100 characters"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
});

export const emailOtpSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
});

export const verifyEmailOtpSchema = z.object({
	opt: z
		.string()
		.min(1, "OTP is required")
		.length(6, "OTP must be 6 digits")
		.regex(/^\d+$/, "OTP must contain only numbers"),
});

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
});

// ── Inferred types from schemas ──

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type EmailOtpFormValues = z.infer<typeof emailOtpSchema>;
export type VerifyEmailOtpFormValues = z.infer<typeof verifyEmailOtpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
