"use client";

import type React from "react";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { emailOtpSchema } from "../domain/auth.schemas";
import { useSendEmailOtp } from "../hooks/use-email-otp";
import { useRegisterStore } from "../store/register.store";

export function RegisterEmailStep() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const setStoreEmail = useRegisterStore((s) => s.setEmail);
	const { mutate: sendOtp, isPending } = useSendEmailOtp();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const result = emailOtpSchema.safeParse({ email });
		if (!result.success) {
			setError(result.error.issues[0]?.message ?? "Invalid email.");
			return;
		}

		setStoreEmail(email);
		sendOtp(
			{ email },
			{
				onError: (err: unknown) => {
					const message =
						(err as { response?: { data?: { message?: string } } })?.response
							?.data?.message ??
						"Failed to send verification code. Please try again.";
					setError(message);
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email address</Label>
				<div className="relative">
					<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						id="email"
						type="email"
						placeholder="name@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="pl-10"
						disabled={isPending}
						autoFocus
					/>
				</div>
				{error && <p className="text-sm text-destructive">{error}</p>}
			</div>

			<p className="text-xs text-muted-foreground">
				We&apos;ll send a 6-digit verification code to this email address.
			</p>

			<Button type="submit" className="w-full" disabled={!email || isPending}>
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
