import { toast as sonnerToast, type ExternalToast } from "sonner";

type ToastOptions = ExternalToast;

const toast = {
	/**
	 * Display a default toast notification.
	 */
	default: (message: string, options?: ToastOptions) =>
		sonnerToast(message, options),

	/**
	 * Display a success toast notification.
	 */
	success: (message: string, options?: ToastOptions) =>
		sonnerToast.success(message, options),

	/**
	 * Display an error toast notification.
	 */
	error: (message: string, options?: ToastOptions) =>
		sonnerToast.error(message, options),

	/**
	 * Display a warning toast notification.
	 */
	warning: (message: string, options?: ToastOptions) =>
		sonnerToast.warning(message, options),

	/**
	 * Display an info toast notification.
	 */
	info: (message: string, options?: ToastOptions) =>
		sonnerToast.info(message, options),

	/**
	 * Display a loading toast notification.
	 * Returns the toast id so it can be dismissed or updated.
	 */
	loading: (message: string, options?: ToastOptions) =>
		sonnerToast.loading(message, options),

	/**
	 * Display a promise-based toast that updates on resolve/reject.
	 */
	promise: sonnerToast.promise,

	/**
	 * Dismiss a toast by id, or all toasts if no id is provided.
	 */
	dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};

/**
 * A thin hook wrapper so consuming components can call `const { toast } = useToast()`
 * in a familiar pattern, while still delegating to sonner under the hood.
 */
const useToast = () => {
	return { toast };
};

export { toast, useToast };
