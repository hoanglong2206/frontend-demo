export const APP_CONFIG = {
	APP_NAME: "Frontend Demo",
	PAGINATION_DEFAULT_SIZE: 20,
	TOAST_DURATION_MS: 5000,
	DEBOUNCE_DELAY_MS: 300,
	MAX_FILE_SIZE_MB: 10,
	STALE_TIME_MS: 5 * 60 * 1000, // 5 minutes for React Query
	GC_TIME_MS: 5 * 60 * 1000, // 5 minutes for React Query garbage collection
} as const;

export const AUTH_CONFIG = {
	OTP_MAX_ATTEMPTS: 3,
	RESEND_OTP_COOLDOWN_SECONDS: 60, // 1 minute cooldown for resending OTP
	SESSION_BUFFER_MS: 60_000, // 1 minute buffer before actual expiry
} as const;
