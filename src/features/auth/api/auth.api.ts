import { httpGet, httpPost } from "@/infrastructure/http/request-helpers";
import type {
	ApiResponse,
	MessageResponseDTO,
} from "@/infrastructure/http/api-client.types";
import type {
	ForgotPasswordDTO,
	LoginRequestDTO,
	RegisterRequestDTO,
	ResendEmailOtpDTO,
	SendEmailOtpDTO,
	SendEmailOtpResponseDTO,
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

	register: (data: RegisterRequestDTO) =>
		httpPost<
			ApiResponse<{
				user: UserDTO;
				session: SessionDTO;
			}>
		>(`${BASE}/register`, data),

	logout: () => httpPost<MessageResponseDTO>(`${BASE}/logout`),

	forgotPassword: (data: ForgotPasswordDTO) =>
		httpPost<MessageResponseDTO>(`${BASE}/forgot-password`, data),

	me: () => httpGet<ApiResponse<UserDTO>>(`${BASE}/me`),

	sendEmailOtp: (data: SendEmailOtpDTO) =>
		httpPost<ApiResponse<SendEmailOtpResponseDTO>>(
			`${BASE}/email/otp/send`,
			data,
		),

	resendEmailOtp: (data: ResendEmailOtpDTO) =>
		httpPost<ApiResponse<SendEmailOtpResponseDTO>>(
			`${BASE}/email/otp/resend`,
			data,
		),

	verifyEmailOtp: (data: VerifyEmailOtpDTO) =>
		httpPost<ApiResponse<VerifyEmailOtpResponseDTO>>(
			`${BASE}/email/otp/verify`,
			data,
		),
};
