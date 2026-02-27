export interface CookieOptions {
	maxAge?: number; // seconds
	expires?: Date;
	path?: string;
	domain?: string;
	secure?: boolean;
	sameSite?: "Strict" | "Lax" | "None";
}

export const typedCookieStorage = {
	get<T>(key: string): T | null {
		if (typeof document === "undefined") return null;
		try {
			const match = document.cookie
				.split("; ")
				.find((row) => row.startsWith(`${encodeURIComponent(key)}=`));
			if (!match) return null;
			const raw = decodeURIComponent(match.split("=").slice(1).join("="));
			return JSON.parse(raw) as T;
		} catch {
			return null;
		}
	},

	set<T>(key: string, value: T, options: CookieOptions = {}): void {
		if (typeof document === "undefined") return;
		try {
			const {
				maxAge,
				expires,
				path = "/",
				domain,
				secure,
				sameSite = "Lax",
			} = options;
			let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
			if (maxAge !== undefined) cookie += `; max-age=${maxAge}`;
			if (expires) cookie += `; expires=${expires.toUTCString()}`;
			cookie += `; path=${path}`;
			if (domain) cookie += `; domain=${domain}`;
			if (secure) cookie += "; secure";
			cookie += `; samesite=${sameSite}`;
			document.cookie = cookie;
		} catch {
			// Fail silently
		}
	},

	remove(
		key: string,
		options: Pick<CookieOptions, "path" | "domain"> = {},
	): void {
		this.set(key, "", { ...options, maxAge: 0 });
	},
};
