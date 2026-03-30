export const ROUTES = {
	// ── Auth ──
	LOGIN: "/login",
	REGISTER: "/register",
	FORGOT_PASSWORD: "/forgot-password",

	// ── Main ──
	HOME: "/home",
	USER_CHAT: "/chat",
	USER_DISCOVER: "/discover",

	// ── Settings ──
	SETTINGS_PROFILE: "/settings/profile",
	SETTINGS_SECURITY: "/settings/security",
} as const;
