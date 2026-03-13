import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { toast } from "@/shared/hooks/use-toast";
import { isHttpError } from "@/infrastructure/http/http-error";

export function useLogout() {
	const queryClient = useQueryClient();
	const clearSession = useAuthStore((s) => s.clearSession);
	const session = useAuthStore((s) => s.session);

	return useMutation({
		mutationFn: () =>
			authApi.logout({ refresh_token: session?.refreshToken ?? "" }),
		onSuccess: () => {
			toast.success("Logged out successfully.");

			clearSession();
			queryClient.clear();
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
