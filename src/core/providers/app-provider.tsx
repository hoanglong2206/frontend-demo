"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "@/shared/components/ui/sonner";
import { QueryProvider } from "./query-provider";
import { SessionProvider } from "./session-provider";
import { ThemeProvider } from "./theme-provider";
import {
	registerGlobalErrorHandler,
	unregisterGlobalErrorHandler,
} from "@/core/error";

interface AppProvidersProps {
	children: ReactNode;
}

/**
 * Compose all providers in dependency order.
 * Theme → Query → Socket (socket may need auth from query cache).
 */
export function AppProviders({ children }: AppProvidersProps) {
	useEffect(() => {
		registerGlobalErrorHandler({
			onError: (error, context) => {
				console.error("Global error captured:", { error, context });
			},
		});

		return () => unregisterGlobalErrorHandler();
	}, []);
	return (
		<QueryProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<SessionProvider>{children}</SessionProvider>
				<Toaster />
			</ThemeProvider>
		</QueryProvider>
	);
}
