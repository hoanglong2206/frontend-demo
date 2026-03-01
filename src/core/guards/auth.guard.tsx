"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { isAuthenticated } from "@/features/auth/domain/auth.rule";
import { ROUTES } from "@/core/config/route";

interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();
	const session = useAuthStore((s) => s.session);
	const isHydrated = useAuthStore((s) => s.isHydrated);

	useEffect(() => {
		if (!isHydrated) return;
		if (!isAuthenticated(session)) {
			router.replace(ROUTES.LOGIN);
		}
	}, [isHydrated, session, router]);

	if (!isHydrated || !isAuthenticated(session)) return null;

	return <>{children}</>;
}
