"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

interface AppProvidersProps {
	children: ReactNode;
}

/**
 * Compose all providers in dependency order.
 * Theme → Query → Socket (socket may need auth from query cache).
 */
export function AppProviders({ children }: AppProvidersProps) {
	return <QueryProvider>{children}</QueryProvider>;
}
