export const typedSessionStorage = {
	get<T>(key: string): T | null {
		if (typeof window === "undefined") return null;
		try {
			const item = sessionStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : null;
		} catch {
			return null;
		}
	},

	set<T>(key: string, value: T): void {
		if (typeof window === "undefined") return;
		try {
			sessionStorage.setItem(key, JSON.stringify(value));
		} catch {
			// Storage quota exceeded — fail silently
		}
	},

	remove(key: string): void {
		if (typeof window === "undefined") return;
		sessionStorage.removeItem(key);
	},

	clear(): void {
		if (typeof window === "undefined") return;
		sessionStorage.clear();
	},
};
