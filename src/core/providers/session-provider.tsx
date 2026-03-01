"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { setupGlobalErrorHandler } from "@/core/error";
import { ROUTES } from "@/core/config/route";

/**
 * Listens for session-expired events from the HTTP interceptor.
 * This is the bridge between infrastructure/ and features/.
 * The interceptor doesn't import auth store directly — it dispatches an event.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		// Setup global error handler
		setupGlobalErrorHandler();

		// Listen for session expiry from HTTP interceptor
		function handleSessionExpired() {
			useAuthStore.getState().clearSession();
			router.push(ROUTES.LOGIN);
		}

		window.addEventListener("auth:session-expired", handleSessionExpired);

		return () => {
			window.removeEventListener("auth:session-expired", handleSessionExpired);
		};
	}, []);

	return <>{children}</>;
}
