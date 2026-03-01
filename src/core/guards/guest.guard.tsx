"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { isAuthenticated } from "@/features/auth/domain/auth.rule";
import { ROUTES } from "../config/route";

interface GuestGuardProps {
	children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
	const router = useRouter();
	const session = useAuthStore((s) => s.session);
	const isHydrated = useAuthStore((s) => s.isHydrated);

	useEffect(() => {
		if (!isHydrated) return;
		if (isAuthenticated(session)) {
			router.replace(ROUTES.HOME);
		}
	}, [isHydrated, session, router]);

	if (!isHydrated || isAuthenticated(session)) return null;

	return <>{children}</>;
}
