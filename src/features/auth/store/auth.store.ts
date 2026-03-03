import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User } from "../domain/auth.types";

// ══════ AUTH STORE ══════

interface AuthState {
	session: Session | null;
	user: User | null;
	isHydrated: boolean;

	setSession: (session: Session, user: User) => void;
	clearSession: () => void;
	setIsHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			session: null,
			user: null,
			isHydrated: false,

			setSession: (session, user) => set({ session, user }),
			clearSession: () => set({ session: null, user: null }),

			setIsHydrated: (hydrated) => set({ isHydrated: hydrated }),
		}),
		{
			name: "auth-session",
			partialize: (state) => ({
				session: state.session,
				user: state.user,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setIsHydrated(true);
			},
		},
	),
);
