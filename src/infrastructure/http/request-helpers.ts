import { axiosInstance } from "./interceptors";

// ══════ TYPED REQUEST HELPERS ══════

export async function httpGet<T>(
	url: string,
	params?: Record<string, unknown>,
): Promise<T> {
	const response = await axiosInstance.get<T>(url, { params });
	return response.data;
}

export async function httpPost<T>(url: string, data?: unknown): Promise<T> {
	const response = await axiosInstance.post<T>(url, data);
	return response.data;
}

export async function httpPut<T>(url: string, data?: unknown): Promise<T> {
	const response = await axiosInstance.put<T>(url, data);
	return response.data;
}
export async function httpPatch<T>(url: string, data?: unknown): Promise<T> {
	const response = await axiosInstance.patch<T>(url, data);
	return response.data;
}

export async function httpDelete<T>(url: string): Promise<T> {
	const response = await axiosInstance.delete<T>(url);
	return response.data;
}
