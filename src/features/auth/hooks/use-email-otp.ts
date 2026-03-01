import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRegisterStore } from "../store/register.store";

export function useSendEmailOtp() {
	const setVerificationToken = useRegisterStore((s) => s.setVerificationToken);
	const goToStep = useRegisterStore((s) => s.goToStep);

	return useMutation({
		mutationFn: authApi.sendEmailOtp,
		onSuccess: (res) => {
			setVerificationToken(res.data.verification_token);
			goToStep("otp");
		},
	});
}

export function useResendEmailOtp() {
	const setVerificationToken = useRegisterStore((s) => s.setVerificationToken);

	return useMutation({
		mutationFn: authApi.resendEmailOtp,
		onSuccess: (res) => {
			setVerificationToken(res.data.verification_token);
		},
	});
}

export function useVerifyEmailOtp() {
	const setAccountToken = useRegisterStore((s) => s.setAccountToken);
	const goToStep = useRegisterStore((s) => s.goToStep);

	return useMutation({
		mutationFn: authApi.verifyEmailOtp,
		onSuccess: (res) => {
			setAccountToken(res.data.account_token);
			goToStep("account");
		},
	});
}
