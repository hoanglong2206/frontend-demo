import type {
	InternalAxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from "axios";
import { axiosInstance } from "./axios-instance";
import { HttpError } from "./http-error";

// Extend axios config to support retry flag
declare module "axios" {
	interface InternalAxiosRequestConfig {
		_retry?: boolean;
	}
}

// ══════ AXIOS INTERCEPTORS ══════

// Request interceptor: attach auth token
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Token is read from localStorage at request time
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("auth-storage");
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					const token = parsed?.state?.session?.accessToken;
					if (token) {
						config.headers.Authorization = `Bearer ${token}`;
					}
				} catch {
					// Silently ignore parse errors
				}
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor: normalize errors
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError<{ message?: string; code?: string }>) => {
		const status = error.response?.status;
		const message = error.response?.data?.message || error.message;
		const code = error.response?.data?.code;

		// 401 → attempt silent refresh
		if (status === 401 && !error.config?._retry) {
			error.config!._retry = true;
			try {
				await axiosInstance.post("/auth/refresh");
				return axiosInstance(error.config!);
			} catch {
				// Refresh failed → force logout
				window.dispatchEvent(new CustomEvent("auth:session-expired"));
				return Promise.reject(new HttpError(401, "Session expired", code));
			}
		}

		return Promise.reject(new HttpError(status ?? 500, message, code));
	},
);

export { axiosInstance };
