"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ROUTES } from "@/core/config/route";

/** Custom event name dispatched by the HTTP interceptor on 401 / session expiry. */
export const SESSION_EXPIRED_EVENT = "session:expired";

/**
 * Listens for session-expired events from the HTTP interceptor.
 * This is the bridge between infrastructure/ and features/.
 * The interceptor doesn't import auth store directly — it dispatches an event.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const clearSession = useAuthStore((s) => s.clearSession);

	useEffect(() => {
		function handleSessionExpired() {
			clearSession();
			router.replace(ROUTES.LOGIN);
		}

		window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
		return () => {
			window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
		};
	}, [clearSession, router]);

	return <>{children}</>;
}
