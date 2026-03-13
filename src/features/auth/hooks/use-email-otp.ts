import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRegisterStore } from "../store/register.store";
import { isHttpError } from "@/infrastructure/http/http-error";
import { toast } from "@/shared/hooks/use-toast";

export function useRegisterEmail() {
	const setVerificationToken = useRegisterStore((s) => s.setVerificationToken);
	const goToStep = useRegisterStore((s) => s.goToStep);

	return useMutation({
		mutationFn: authApi.registerEmail,
		onSuccess: (res) => {
			toast.success("Verification code sent to your email.");

			setVerificationToken(res.data.verification_token);
			goToStep("otp");
		},
		onError: (err: unknown) => {
			if (isHttpError(err)) {
				toast.error(err.data.error.message);
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		},
	});
}

export function useResendEmailOtp() {
	const setVerificationToken = useRegisterStore((s) => s.setVerificationToken);
	const resetOtpAttempts = useRegisterStore((s) => s.resetOtpAttempts);

	return useMutation({
		mutationFn: authApi.resendEmailOtp,
		onSuccess: (res) => {
			toast.success("Verification code resent to your email.");

			setVerificationToken(res.data.verification_token);
			resetOtpAttempts();
		},
		onError: (err: unknown) => {
			if (isHttpError(err)) {
				toast.error(err.data.error.message);
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		},
	});
}

export function useVerifyEmailOtp() {
	const setAccountToken = useRegisterStore((s) => s.setAccountToken);
	const goToStep = useRegisterStore((s) => s.goToStep);
	const incrementOtpAttempt = useRegisterStore((s) => s.incrementOtpAttempt);
	const blockOtp = useRegisterStore((s) => s.blockOtp);

	return useMutation({
		mutationFn: authApi.verifyEmailOtp,
		onSuccess: (res) => {
			toast.success("Email verified successfully!");

			setAccountToken(res.data.account_token);
			goToStep("account");
		},
		onError: (err: unknown) => {
			if (isHttpError(err)) {
				const errorMessage = err.data.error.message;
				toast.error(errorMessage);

				// Dựa vào message từ BE để tăng số lần thử hoặc block UI
				const lowerMsg = errorMessage.toLowerCase();
				if (lowerMsg.includes("invalid otp")) {
					incrementOtpAttempt();
				} else if (lowerMsg.includes("max attempts")) {
					blockOtp();
				}
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		},
	});
}
