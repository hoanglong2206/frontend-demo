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
	SessionDTO,
	UserDTO,
	VerifyEmailOtpDTO,
} from "./auth.api.type";

// ══════ AUTH API ══════

const BASE = "/auth";

export const authApi = {
	login: (data: LoginRequestDTO) =>
		httpPost<ApiResponse<SessionDTO>>(`${BASE}/login`, data),

	register: (data: RegisterRequestDTO) =>
		httpPost<ApiResponse<SessionDTO>>(`${BASE}/register`, data),

	logout: () => httpPost<MessageResponseDTO>(`${BASE}/logout`),

	forgotPassword: (data: ForgotPasswordDTO) =>
		httpPost<MessageResponseDTO>(`${BASE}/forgot-password`, data),

	me: () => httpGet<ApiResponse<UserDTO>>(`${BASE}/me`),

	sendEmailOtp: (data: SendEmailOtpDTO) =>
		httpPost<MessageResponseDTO>(`${BASE}/email/otp/send`, data),

	resendEmailOtp: (data: ResendEmailOtpDTO) =>
		httpPost<MessageResponseDTO>(`${BASE}/email/otp/resend`, data),

	verifyEmailOtp: (data: VerifyEmailOtpDTO) =>
		httpPost<MessageResponseDTO>(`${BASE}/email/otp/verify`, data),
};
