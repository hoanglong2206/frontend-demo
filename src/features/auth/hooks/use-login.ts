import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { mapSessionDTO, mapUserDTO } from "../domain/auth.mapper";
import { useAuthStore } from "../store/auth.store";
import { authKeys } from "./auth.query";
import { toast } from "@/shared/hooks/use-toast";
import { isHttpError } from "@/infrastructure/http/http-error";

export function useLogin() {
	const queryClient = useQueryClient();
	const setSession = useAuthStore((s) => s.setSession);

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: (res) => {
			const session = mapSessionDTO(res.data.session);
			const user = mapUserDTO(res.data.user);

			toast.success("Welcome back!");

			setSession(session, user);
			queryClient.setQueryData(authKeys.me(), user);
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
