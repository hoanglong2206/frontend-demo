import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { isHttpError } from "@/infrastructure/http/http-error";
import { toast } from "@/shared/hooks/use-toast";

export function useForgotPassword() {
	return useMutation({
		mutationFn: authApi.forgotPassword,
		onSuccess: () => {
			toast.success("If this email exists, a reset link has been sent.");
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
