import type {
	InternalAxiosRequestConfig,
	AxiosResponse,
	AxiosError,
} from "axios";
import { axiosInstance } from "./axios-instance";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { ApiResponse } from "./api-client.types";
import { createHttpError } from "./http-error";
import type { SessionDTO } from "@/features/auth/api/auth.api.type";

/** Dispatched when the session expires and cannot be refreshed. */
export const SESSION_EXPIRED_EVENT = "session:expired";

function dispatchSessionExpired(): void {
	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
	}
}

// ══════ AXIOS INTERCEPTORS ══════

type RefreshSubscriber = {
	resolve: (token: string) => void;
	reject: (error: unknown) => void;
};

let isRefreshing = false;
let refreshSubscribers: RefreshSubscriber[] = [];

function subscribeToRefresh(
	resolve: (token: string) => void,
	reject: (error: unknown) => void,
): void {
	refreshSubscribers.push({ resolve, reject });
}

function notifySubscribers(token: string): void {
	refreshSubscribers.forEach(({ resolve }) => resolve(token));
	refreshSubscribers = [];
}

function rejectSubscribers(error: unknown): void {
	refreshSubscribers.forEach(({ reject }) => reject(error));
	refreshSubscribers = [];
}

// ── Request interceptor: attach Bearer token ──
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const session = useAuthStore.getState().session;
		if (session?.accessToken) {
			config.headers["Authorization"] = `Bearer ${session.accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// ── Response interceptor: normalize errors + silent token refresh ──
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};
		const status = error.response?.status;

		// Pass through non-HTTP errors (network timeouts, cancelled requests, etc.)
		if (!error.response || status === undefined) {
			return Promise.reject(error);
		}

		const httpError = createHttpError(status, error.response.data);

		// ── 401: attempt silent token refresh ──
		if (status === 401 && !originalRequest._retry) {
			const { session, user, setSession, clearSession } =
				useAuthStore.getState();

			if (!session?.refreshToken) {
				clearSession();
				dispatchSessionExpired();
				return Promise.reject(httpError);
			}

			// While a refresh is already in flight, queue this request
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					subscribeToRefresh(
						(newToken) => {
							originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
							resolve(axiosInstance(originalRequest));
						},
						(err) => reject(err),
					);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { data: body } = await axiosInstance.post<
					ApiResponse<SessionDTO>
				>("/auth/refresh", {
					refresh_token: session.refreshToken,
				});

				const dto = body.data;
				const newSession = {
					accessToken: dto.access_token,
					refreshToken: dto.refresh_token,
					expiresAt: dto.expires_at,
				};

				// Persist updated session (keep existing user object)
				if (user) setSession(newSession, user);

				notifySubscribers(newSession.accessToken);
				isRefreshing = false;

				originalRequest.headers["Authorization"] =
					`Bearer ${newSession.accessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				isRefreshing = false;
				rejectSubscribers(refreshError);
				clearSession();
				dispatchSessionExpired();
				return Promise.reject(httpError);
			}
		}

		return Promise.reject(httpError);
	},
);

export { axiosInstance };
