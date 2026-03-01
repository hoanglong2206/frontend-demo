"use client";

import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import {
	emailOtpSchema,
	type EmailOtpFormValues,
} from "../domain/auth.schemas";
import { useSendEmailOtp } from "../hooks/use-email-otp";
import { useRegisterStore } from "../store/register.store";
import { toast } from "@/shared/hooks/use-toast";

export function RegisterEmailStep() {
	const setStoreEmail = useRegisterStore((s) => s.setEmail);
	const { mutate: sendOtp, isPending } = useSendEmailOtp();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<EmailOtpFormValues>({
		resolver: zodResolver(emailOtpSchema),
		mode: "onChange",
	});

	const onSubmit = ({ email }: EmailOtpFormValues) => {
		setStoreEmail(email);
		sendOtp(
			{ email },
			{
				onSuccess: () => {
					toast.success("Verification code sent to your email.");
				},
				onError: (err: unknown) => {
					const message =
						(err as { response?: { data?: { message?: string } } })?.response
							?.data?.message ??
						"Failed to send verification code. Please try again.";
					toast.error(message);
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label htmlFor="email">Email address</Label>
					{errors.email && (
						<p className="-mt-1 text-xs text-destructive/60 font-medium italic">
							{errors.email.message}
						</p>
					)}
				</div>
				<div className="relative">
					<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						id="email"
						type="email"
						placeholder="name@example.com"
						className="pl-10"
						disabled={isPending}
						autoFocus
						{...register("email")}
					/>
				</div>
			</div>

			<p className="text-xs text-muted-foreground">
				We&apos;ll send a 6-digit verification code to this email address.
			</p>

			<Button type="submit" className="w-full" disabled={!isValid || isPending}>
				{isPending ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Sending code...
					</>
				) : (
					"Continue"
				)}
			</Button>
		</form>
	);
}
