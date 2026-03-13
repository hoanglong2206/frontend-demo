type ToastType =
	| "default"
	| "success"
	| "error"
	| "warning"
	| "info"
	| "loading";

type ToastId = string | number;

type ToastPromiseMessages<T> = {
	loading: string;
	success: string | ((data: T) => string);
	error: string | ((error: unknown) => string);
};

export type ToastOptions = {
	id?: ToastId;
	duration?: number;
	description?: string;
};

export type ToastItem = {
	id: ToastId;
	message: string;
	description?: string;
	type: ToastType;
	duration: number;
};

type ToastListener = () => void;

const DEFAULT_DURATION = 3500;

let toastSeq = 0;
let toasts: ToastItem[] = [];
const listeners = new Set<ToastListener>();
const timers = new Map<ToastId, ReturnType<typeof setTimeout>>();

const nextToastId = (): ToastId => {
	toastSeq += 1;
	return toastSeq;
};

const notify = () => {
	listeners.forEach((listener) => listener());
};

const setToasts = (nextToasts: ToastItem[]) => {
	toasts = nextToasts;
	notify();
};

const clearToastTimer = (id: ToastId) => {
	const timer = timers.get(id);
	if (timer) {
		clearTimeout(timer);
		timers.delete(id);
	}
};

const scheduleDismiss = (id: ToastId, duration: number) => {
	if (duration <= 0) return;
	clearToastTimer(id);
	const timer = setTimeout(() => {
		dismissToast(id);
	}, duration);
	timers.set(id, timer);
};

const dismissToast = (id?: ToastId) => {
	if (typeof id === "undefined") {
		Array.from(timers.keys()).forEach(clearToastTimer);
		setToasts([]);
		return;
	}

	clearToastTimer(id);
	setToasts(toasts.filter((toast) => toast.id !== id));
};

const upsertToast = (
	type: ToastType,
	message: string,
	options?: ToastOptions,
	defaultDuration = DEFAULT_DURATION,
) => {
	const id = options?.id ?? nextToastId();
	const duration = options?.duration ?? defaultDuration;
	const toast: ToastItem = {
		id,
		message,
		type,
		duration,
		...(typeof options?.description === "string"
			? { description: options.description }
			: {}),
	};

	const index = toasts.findIndex((item) => item.id === id);
	if (index >= 0) {
		const nextToasts = [...toasts];
		nextToasts[index] = toast;
		setToasts(nextToasts);
	} else {
		setToasts([toast, ...toasts]);
	}

	scheduleDismiss(id, duration);
	return id;
};

const toast = {
	default: (message: string, options?: ToastOptions) =>
		upsertToast("default", message, options),
	success: (message: string, options?: ToastOptions) =>
		upsertToast("success", message, options),
	error: (message: string, options?: ToastOptions) =>
		upsertToast("error", message, options),
	warning: (message: string, options?: ToastOptions) =>
		upsertToast("warning", message, options),
	info: (message: string, options?: ToastOptions) =>
		upsertToast("info", message, options),
	loading: (message: string, options?: ToastOptions) =>
		upsertToast("loading", message, options, 0),
	promise: async <T>(
		promise: Promise<T> | (() => Promise<T>),
		messages: ToastPromiseMessages<T>,
	) => {
		const id = upsertToast("loading", messages.loading, { duration: 0 });
		try {
			const result = await (typeof promise === "function"
				? promise()
				: promise);
			const message =
				typeof messages.success === "function"
					? messages.success(result)
					: messages.success;
			upsertToast("success", message, { id });
			return result;
		} catch (error) {
			const message =
				typeof messages.error === "function"
					? messages.error(error)
					: messages.error;
			upsertToast("error", message, { id });
			throw error;
		}
	},
	dismiss: dismissToast,
};

const subscribeToToasts = (listener: ToastListener) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

const getToasts = () => toasts;

/**
 * A thin hook wrapper so consuming components can call `const { toast } = useToast()`
 * in a familiar pattern, while still delegating to sonner under the hood.
 */
const useToast = () => {
	return { toast };
};

export { toast, useToast, subscribeToToasts, getToasts };
