import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { authKeys } from "./auth.query";

export function useSendEmailOtp() {
	return useMutation({
		mutationFn: authApi.sendEmailOtp,
	});
}

export function useResendEmailOtp() {
	return useMutation({
		mutationFn: authApi.resendEmailOtp,
	});
}

export function useVerifyEmailOtp() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: authApi.verifyEmailOtp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: authKeys.me() });
		},
	});
}
