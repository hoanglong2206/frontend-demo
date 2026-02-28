import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { mapSessionDTO } from "../domain/auth.mapper";
import { useAuthStore } from "../store/auth.store";
import { authKeys } from "./auth.query";

export function useRegister() {
	const queryClient = useQueryClient();
	const setSession = useAuthStore((s) => s.setSession);

	return useMutation({
		mutationFn: authApi.register,
		onSuccess: (res) => {
			const session = mapSessionDTO(res.data);
			setSession(session);
			queryClient.setQueryData(authKeys.me(), session.user);
		},
	});
}
