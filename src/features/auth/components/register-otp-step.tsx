"use client";

import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
	verifyEmailOtpSchema,
	type VerifyEmailOtpFormValues,
} from "../domain/auth.schemas";

export function RegisterOtpStep() {
	const { email, verificationToken, otpAttempts, isBlocked } =
		useRegisterStore();

	const { mutate: verifyOtp, isPending: isVerifying } = useVerifyEmailOtp();
	const { mutate: resendOtp, isPending: isResending } = useResendEmailOtp();

	const { secondsLeft, isActive, start } = useCountdown(
		AUTH_CONFIG.RESEND_OTP_COOLDOWN_SECONDS,
	);

	const {
		control,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<VerifyEmailOtpFormValues>({
		resolver: zodResolver(verifyEmailOtpSchema),
		mode: "onChange",
		defaultValues: { otp: "" },
	});

	const onSubmit = ({ otp }: VerifyEmailOtpFormValues) => {
		if (isBlocked) return;
		verifyOtp({ email, otp, verification_token: verificationToken });
	};

	const handleResend = () => {
		resendOtp(
			{ email },
			{
				onSuccess: () => {
					// Khởi động lại đếm ngược và xóa giá trị trong ô OTP
					start();
					reset({ otp: "" });
				},
			},
		);
	};

	const isPending = isVerifying || isResending;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="text-center space-y-1">
				<p className="text-sm text-muted-foreground">
					We sent a 6-digit verification code to
				</p>
				<p className="font-medium text-sm">{email}</p>
			</div>

			<div className="flex justify-center">
				<Controller
					name="otp"
					control={control}
					render={({ field }) => (
						<InputOTP
							maxLength={6}
							value={field.value}
							onChange={field.onChange}
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
					)}
				/>
			</div>

			<div className="text-center space-y-2">
				<p className="text-xs text-muted-foreground">
					Attempts remaining:{" "}
					<span
						className={
							isBlocked
								? "font-medium text-destructive"
								: "font-medium text-foreground"
						}
					>
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
				type="submit"
				className="w-full"
				disabled={!isValid || isPending || isBlocked}
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
		</form>
	);
}
