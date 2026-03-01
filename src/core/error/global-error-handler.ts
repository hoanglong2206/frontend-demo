export function setupGlobalErrorHandler(): void {
	if (typeof window === "undefined") return;

	window.addEventListener("error", (event: ErrorEvent) => {
		console.error("[Global Error]", {
			message: event.message,
			filename: event.filename,
			lineno: event.lineno,
			colno: event.colno,
			error: event.error,
		});

		// TODO: Send to error tracking service (Sentry, etc.)
	});

	window.addEventListener(
		"unhandledrejection",
		(event: PromiseRejectionEvent) => {
			console.error("[Unhandled Promise Rejection]", event.reason);

			// TODO: Send to error tracking service
		},
	);
}
