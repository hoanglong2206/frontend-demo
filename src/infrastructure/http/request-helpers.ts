import { axiosInstance } from "./interceptors";
import type { AxiosRequestConfig } from "axios";

// ══════ TYPED REQUEST HELPERS ══════

export async function httpGet<T>(
	url: string,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axiosInstance.get<T>(url, config);
	return response.data;
}

export async function httpPost<T, D = unknown>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axiosInstance.post<T>(url, data, config);
	return response.data;
}

export async function httpPut<T, D = unknown>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axiosInstance.put<T>(url, data, config);
	return response.data;
}
export async function httpPatch<T, D = unknown>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axiosInstance.patch<T>(url, data, config);
	return response.data;
}

export async function httpDelete<T>(
	url: string,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response = await axiosInstance.delete<T>(url, config);
	return response.data;
}
