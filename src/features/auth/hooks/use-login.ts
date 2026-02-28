import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { mapSessionDTO, mapUserDTO } from "../domain/auth.mapper";
import { useAuthStore } from "../store/auth.store";
import { authKeys } from "./auth.query";

export function useLogin() {
	const queryClient = useQueryClient();
	const setSession = useAuthStore((s) => s.setSession);

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: (res) => {
			const session = mapSessionDTO(res.data);
			const user = mapUserDTO(res.data.user);
			setSession(session, user);
			queryClient.setQueryData(authKeys.me(), user);
		},
	});
}
