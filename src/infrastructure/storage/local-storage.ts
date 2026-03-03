export const typedLocalStorage = {
	get<T>(key: string): T | null {
		if (typeof window === "undefined") return null;
		try {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : null;
		} catch {
			return null;
		}
	},

	set<T>(key: string, value: T): void {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {
			console.warn(`Failed to set localStorage item "${key}"`); // Fail silently
		}
	},

	remove(key: string): void {
		if (typeof window === "undefined") return;
		localStorage.removeItem(key);
	},

	clear(): void {
		if (typeof window === "undefined") return;
		localStorage.clear();
	},

	has(key: string): boolean {
		if (typeof window === "undefined") return false;
		return localStorage.getItem(key) !== null;
	},

	keys(): string[] {
		if (typeof window === "undefined") return [];
		return Object.keys(localStorage);
	},
};
