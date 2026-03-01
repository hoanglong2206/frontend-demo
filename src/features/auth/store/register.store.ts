import { AUTH_CONFIG } from "@/core/config/constants";
import { create } from "zustand";

type RegisterStep = "email" | "otp" | "account";

interface RegisterState {
	// ── Flow State ──
	step: RegisterStep;
	email: string;
	verificationToken: string;
	accountToken: string;

	// ── OTP State ──
	otpAttempts: number;
	isBlocked: boolean;

	// ── Actions ──
	setEmail: (email: string) => void;
	setVerificationToken: (token: string) => void;
	setAccountToken: (token: string) => void;
	goToStep: (step: RegisterStep) => void;
	incrementOtpAttempt: () => void;
	resetOtpAttempts: () => void;
	blockOtp: () => void;
	resetFlow: () => void;
}

const INITIAL_STATE = {
	step: "email" as RegisterStep,
	email: "",
	verificationToken: "",
	accountToken: "",
	otpAttempts: 0,
	isBlocked: false,
};

export const useRegisterStore = create<RegisterState>((set) => ({
	...INITIAL_STATE,

	setEmail: (email) => set({ email }),

	setVerificationToken: (verificationToken) => set({ verificationToken }),

	setAccountToken: (accountToken) => set({ accountToken }),

	goToStep: (step) => set({ step }),

	incrementOtpAttempt: () =>
		set((state) => {
			const newAttempts = state.otpAttempts + 1;
			return {
				otpAttempts: newAttempts,
				isBlocked: newAttempts >= AUTH_CONFIG.OTP_MAX_ATTEMPTS,
			};
		}),

	resetOtpAttempts: () => set({ otpAttempts: 0, isBlocked: false }),

	blockOtp: () => set({ isBlocked: true }),

	resetFlow: () => set(INITIAL_STATE),
}));
