import axios from "axios";

// ══════ CONFIGURED AXIOS INSTANCE ══════

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 15_000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
});
