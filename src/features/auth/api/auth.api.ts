import { httpGet, httpPost } from "@/infrastructure/http/request-helpers";
import type {
	ApiResponse,
	MessageResponseDTO,
} from "@/infrastructure/http/api-client.types";
import type {
	ForgotPasswordDTO,
	LoginRequestDTO,
	CreateAccountDTO,
	ResendEmailOtpDTO,
	RegisterEmailDTO,
	RegisterEmailResponseDTO,
	SessionDTO,
	UserDTO,
	VerifyEmailOtpDTO,
	VerifyEmailOtpResponseDTO,
} from "./auth.api.type";

// ══════ AUTH API ══════

const BASE = "/auth";

export const authApi = {
	login: (data: LoginRequestDTO) =>
		httpPost<
			ApiResponse<{
				user: UserDTO;
				session: SessionDTO;
			}>
		>(`${BASE}/login`, data),

	createAccount: (data: CreateAccountDTO) =>
		httpPost<
			ApiResponse<{
				user: UserDTO;
				session: SessionDTO;
			}>
		>(`${BASE}/create-account`, data),

	logout: (data: { refresh_token: string }) =>
		httpPost<MessageResponseDTO>(`${BASE}/logout`, data),

	forgotPassword: (data: ForgotPasswordDTO) =>
		httpPost<MessageResponseDTO>(`${BASE}/forgot-password`, data),

	me: () => httpGet<ApiResponse<UserDTO>>(`${BASE}/me`),

	registerEmail: (data: RegisterEmailDTO) =>
		httpPost<ApiResponse<RegisterEmailResponseDTO>>(
			`${BASE}/register-email`,
			data,
		),

	resendEmailOtp: (data: ResendEmailOtpDTO) =>
		httpPost<ApiResponse<RegisterEmailResponseDTO>>(`${BASE}/resend-otp`, data),

	verifyEmailOtp: (data: VerifyEmailOtpDTO) =>
		httpPost<ApiResponse<VerifyEmailOtpResponseDTO>>(
			`${BASE}/verify-otp`,
			data,
		),
};
