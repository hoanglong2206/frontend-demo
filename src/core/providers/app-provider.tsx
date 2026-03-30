"use client";

import { ReactNode, useEffect } from "react";
import { ToasterContainer } from "@/shared/components/ui/toast-container";
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
			<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
				<SessionProvider>{children}</SessionProvider>
				<ToasterContainer />
			</ThemeProvider>
		</QueryProvider>
	);
}
