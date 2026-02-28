import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User } from "../domain/auth.types";

// ══════ AUTH STORE ══════

interface AuthState {
session: Session | null;
user: User | null;

setSession: (session: Session) => void;
clearSession: () => void;
updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
persist(
(set) => ({
session: null,
user: null,

setSession: (session) => set({ session, user: session.user }),
clearSession: () => set({ session: null, user: null }),
updateUser: (user) =>
set((state) => ({
user,
session: state.session ? { ...state.session, user } : null,
})),
}),
{
name: "auth-session",
partialize: (state) => ({ session: state.session, user: state.user }),
},
),
);
