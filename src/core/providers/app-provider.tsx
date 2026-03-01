"use client";

import { ReactNode } from "react";
import { Toaster } from "@/shared/components/ui/sonner";
import { QueryProvider } from "./query-provider";
import { SessionProvider } from "./session-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
	children: ReactNode;
}

/**
 * Compose all providers in dependency order.
 * Theme → Query → Socket (socket may need auth from query cache).
 */
export function AppProviders({ children }: AppProvidersProps) {
	return (
		<QueryProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<SessionProvider>{children}</SessionProvider>
				<Toaster />
			</ThemeProvider>
		</QueryProvider>
	);
}
