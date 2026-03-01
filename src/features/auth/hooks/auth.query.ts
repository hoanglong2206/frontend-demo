import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { mapUserDTO } from "../domain/auth.mapper";
import { APP_CONFIG } from "@/core/config/constants";

// ── Query Keys ──

export const authKeys = {
	all: ["auth"] as const,
	me: () => [...authKeys.all, "me"] as const,
};

// ── Queries ──

/**
 * Fetches the current authenticated user.
 * Used by AuthGuard, Header, and any component needing user data.
 * Maps DTO → Domain model at the query level.
 */
export function useCurrentUser() {
	return useQuery({
		queryKey: authKeys.me(),
		queryFn: async () => {
			const res = await authApi.me();
			return mapUserDTO(res.data);
		},
		staleTime: APP_CONFIG.STALE_TIME_MS, // Cache for 5 minutes
		retry: false,
	});
}
