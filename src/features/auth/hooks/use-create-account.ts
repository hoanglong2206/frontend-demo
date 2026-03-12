import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { mapSessionDTO, mapUserDTO } from "../domain/auth.mapper";
import { useAuthStore } from "../store/auth.store";
import { useRegisterStore } from "../store/register.store";
import { authKeys } from "./auth.query";

export function useCreateAccount() {
	const queryClient = useQueryClient();
	const setSession = useAuthStore((s) => s.setSession);
	const resetFlow = useRegisterStore((s) => s.resetFlow);

	return useMutation({
		mutationFn: authApi.createAccount,
		onSuccess: (res) => {
			const session = mapSessionDTO(res.data.session);
			const user = mapUserDTO(res.data.user);
			setSession(session, user);
			queryClient.setQueryData(authKeys.me(), user);
			resetFlow();
		},
	});
}
