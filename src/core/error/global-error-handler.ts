// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface GlobalErrorHandlerOptions {
	/** Called for every unhandled error. Forward to Sentry / Datadog / etc. */
	onError?: (error: Error, context: ErrorContext) => void;
	/** Whether to suppress console.error in production. Default: false. */
	silentInProduction?: boolean;
}

interface ErrorContext {
	type: "unhandled-error" | "unhandled-rejection" | "console-error";
	source?: string;
	lineno?: number;
	colno?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal state
// ─────────────────────────────────────────────────────────────────────────────
let _registered = false;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function registerGlobalErrorHandler(
	options: GlobalErrorHandlerOptions = {},
): void {
	if (typeof window === "undefined") return; // SSR guard
	if (_registered) return;

	_registered = true;

	// ── window.onerror ────────────────────────────────────────────────────────
	window.onerror = (message, source, lineno, colno, error) => {
		const err = error ?? new Error(String(message));
		const context: ErrorContext = {
			type: "unhandled-error",
			source: String(source),
			...(lineno !== undefined && { lineno }),
			...(colno !== undefined && { colno }),
		};
		handleError(err, context, options);
		// Return false so the browser still logs it in devtools
		return false;
	};

	// ── unhandledrejection ────────────────────────────────────────────────────
	window.addEventListener(
		"unhandledrejection",
		(event: PromiseRejectionEvent) => {
			const err =
				event.reason instanceof Error
					? event.reason
					: new Error(String(event.reason ?? "Unhandled promise rejection"));

			handleError(err, { type: "unhandled-rejection" }, options);
		},
	);
}

/** Deregisters global handlers (useful in tests). */
export function unregisterGlobalErrorHandler(): void {
	if (typeof window === "undefined") return;
	window.onerror = null;
	window.removeEventListener("unhandledrejection", () => {});
	_registered = false;
}

function handleError(
	error: Error,
	context: ErrorContext,
	options: GlobalErrorHandlerOptions,
): void {
	if (!options.silentInProduction) {
		console.error(`[GlobalErrorHandler] (${context.type}):`, error);
	}
	options.onError?.(error, context);
}
