"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { Button } from "@/shared/components/ui/button";
import { useCountdown } from "@/shared/hooks/use-countdown";
import { useRegisterStore } from "../store/register.store";
import { useVerifyEmailOtp, useResendEmailOtp } from "../hooks/use-email-otp";
import { canResendOtp, getRemainingAttempts } from "../domain/auth.rule";
import { AUTH_CONFIG } from "@/core/config/constants";

export function RegisterOtpStep() {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");

	const {
		email,
		verificationToken,
		otpAttempts,
		isBlocked,
		incrementOtpAttempt,
		resetOtpAttempts,
	} = useRegisterStore();

	const { mutate: verifyOtp, isPending: isVerifying } = useVerifyEmailOtp();
	const { mutate: resendOtp, isPending: isResending } = useResendEmailOtp();

	const { secondsLeft, isActive, start } = useCountdown(
		AUTH_CONFIG.RESEND_OTP_COOLDOWN_SECONDS,
	);

	const handleVerify = () => {
		if (otp.length !== 6 || isBlocked) return;
		setError("");

		verifyOtp(
			{ email, otp, verification_token: verificationToken },
			{
				onError: (err: unknown) => {
					incrementOtpAttempt();
					// otpAttempts is stale here; compute remaining from next value
					const remaining = getRemainingAttempts(otpAttempts + 1);
					const serverMessage = (
						err as { response?: { data?: { message?: string } } }
					)?.response?.data?.message;

					if (remaining <= 0) {
						setError("Maximum attempts reached. Please request a new code.");
					} else {
						setError(
							serverMessage ??
								`Invalid code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
						);
					}
					setOtp("");
				},
			},
		);
	};

	const handleResend = () => {
		setError("");
		setOtp("");

		resendOtp(
			{ email },
			{
				onSuccess: () => {
					resetOtpAttempts();
					start(AUTH_CONFIG.RESEND_OTP_COOLDOWN_SECONDS);
				},
				onError: (err: unknown) => {
					const message =
						(err as { response?: { data?: { message?: string } } })?.response
							?.data?.message ?? "Failed to resend code. Please try again.";
					setError(message);
				},
			},
		);
	};

	const isPending = isVerifying || isResending;

	return (
		<div className="space-y-4">
			<div className="text-center space-y-1">
				<p className="text-sm text-muted-foreground">
					We sent a 6-digit verification code to
				</p>
				<p className="font-medium text-sm">{email}</p>
			</div>

			<div className="flex justify-center">
				<InputOTP
					maxLength={6}
					value={otp}
					onChange={setOtp}
					disabled={isPending || isBlocked}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</div>

			{error && <p className="text-sm text-destructive text-center">{error}</p>}

			<div className="text-center space-y-2">
				<p className="text-xs text-muted-foreground">
					Attempts remaining:{" "}
					<span className="font-medium text-foreground">
						{getRemainingAttempts(otpAttempts)}
					</span>
				</p>

				{!canResendOtp(secondsLeft, isBlocked) && isActive ? (
					<p className="text-xs text-muted-foreground">
						Resend code in{" "}
						<span className="font-medium text-foreground">{secondsLeft}s</span>
					</p>
				) : canResendOtp(secondsLeft, isBlocked) ? (
					<Button
						type="button"
						variant="link"
						size="sm"
						className="h-auto p-0 text-xs"
						onClick={handleResend}
						disabled={isPending}
					>
						{isResending ? (
							<>
								<Loader2 className="mr-1 h-3 w-3 animate-spin" />
								Resending...
							</>
						) : (
							"Resend code"
						)}
					</Button>
				) : null}
			</div>

			<Button
				type="button"
				className="w-full"
				onClick={handleVerify}
				disabled={otp.length !== 6 || isPending || isBlocked}
			>
				{isVerifying ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Verifying...
					</>
				) : (
					"Verify"
				)}
			</Button>
		</div>
	);
}
