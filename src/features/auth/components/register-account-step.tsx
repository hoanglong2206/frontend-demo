"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { PasswordStrength } from "./password-strength";
import { registerSchema } from "../domain/auth.schemas";
import { useRegister } from "../hooks/use-register";
import { useRegisterStore } from "../store/register.store";

export function RegisterAccountStep() {
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{
		fullName?: string;
		password?: string;
	}>({});

	const { email, accountToken } = useRegisterStore();
	const { mutate: register, isPending } = useRegister();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		const result = registerSchema.safeParse({ fullName, password });
		if (!result.success) {
			const fieldErrors: { fullName?: string; password?: string } = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as "fullName" | "password";
				if (!fieldErrors[field]) fieldErrors[field] = issue.message;
			}
			setErrors(fieldErrors);
			return;
		}

		register(
			{ fullName, email, password, account_token: accountToken },
			{
				onError: (err: unknown) => {
					const message =
						(err as { response?: { data?: { message?: string } } })?.response
							?.data?.message ?? "Registration failed. Please try again.";
					setErrors({ fullName: message });
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email-readonly">Email</Label>
				<Input
					id="email-readonly"
					type="email"
					value={email}
					disabled
					className="bg-muted"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="fullName">Full name</Label>
				<Input
					id="fullName"
					type="text"
					placeholder="Enter your full name"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					disabled={isPending}
					autoFocus
				/>
				{errors.fullName && (
					<p className="text-sm text-destructive">{errors.fullName}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="Create a password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="pr-10"
						disabled={isPending}
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="absolute right-0 top-0 h-full px-3 hover:bg-transparent cursor-pointer"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeOff className="h-4 w-4 text-muted-foreground" />
						) : (
							<Eye className="h-4 w-4 text-muted-foreground" />
						)}
						<span className="sr-only">Toggle password visibility</span>
					</Button>
				</div>
				<PasswordStrength password={password} />
				{errors.password && (
					<p className="text-sm text-destructive">{errors.password}</p>
				)}
				<p className="text-xs text-muted-foreground">
					Must be at least 8 characters with uppercase, lowercase, and a number.
				</p>
			</div>

			<Button
				type="submit"
				className="w-full"
				disabled={isPending || !fullName.trim() || password.length < 8}
			>
				{isPending ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Creating account...
					</>
				) : (
					"Create account"
				)}
			</Button>
		</form>
	);
}
