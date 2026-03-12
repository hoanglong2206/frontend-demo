import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export function useLogout() {
	const queryClient = useQueryClient();
	const clearSession = useAuthStore((s) => s.clearSession);
	const session = useAuthStore((s) => s.session);

	return useMutation({
		mutationFn: () =>
			authApi.logout({ refresh_token: session?.refreshToken ?? "" }),
		onSuccess: () => {
			clearSession();
			queryClient.clear();
		},
	});
}
