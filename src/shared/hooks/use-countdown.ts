import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(initialSeconds: number) {
	const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
	const [isActive, setIsActive] = useState(initialSeconds > 0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	// ── Cleanup helper ──
	const clearTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	// ── Start/restart countdown ──
	const start = useCallback(
		(seconds?: number) => {
			clearTimer();
			const duration = seconds ?? initialSeconds;
			setSecondsLeft(duration);
			setIsActive(true);

			intervalRef.current = setInterval(() => {
				setSecondsLeft((prev) => {
					if (prev <= 1) {
						clearTimer();
						setIsActive(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		},
		[initialSeconds, clearTimer],
	);

	// ── Initial start ──
	useEffect(() => {
		if (initialSeconds > 0) {
			start(initialSeconds);
		}
		// Cleanup on unmount — prevents the "update state on unmounted component" leak
		return clearTimer;
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		secondsLeft,
		isActive,
		isComplete: !isActive && secondsLeft === 0,
		start,
	};
}
