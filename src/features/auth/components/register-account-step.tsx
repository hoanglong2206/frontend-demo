"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { PasswordStrength } from "./password-strength";
import {
	registerSchema,
	type RegisterFormValues,
} from "../domain/auth.schemas";
import { useCreateAccount } from "../hooks/use-create-account";
import { useRegisterStore } from "../store/register.store";
import { toast } from "@/shared/hooks/use-toast";

export function RegisterAccountStep() {
	const [showPassword, setShowPassword] = useState(false);

	const { email, accountToken } = useRegisterStore();
	const { mutate: createAccount, isPending } = useCreateAccount();

	const {
		register: field,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		mode: "onChange",
	});

	const password = watch("password", "");

	const onSubmit = ({ fullName, password }: RegisterFormValues) => {
		createAccount(
			{ fullName, email, password, account_token: accountToken },
			{
				onSuccess: () => {
					toast.success("Account created! Welcome aboard.");
				},
				onError: (err: unknown) => {
					const message =
						(err as { response?: { data?: { message?: string } } })?.response
							?.data?.message ?? "Registration failed. Please try again.";
					toast.error(message);
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
				<div className="flex items-center justify-between">
					<Label htmlFor="fullName">Full name</Label>
					{errors.fullName && (
						<p className="-mt-1 text-xs text-destructive/60 font-medium italic">
							{errors.fullName.message}
						</p>
					)}
				</div>
				<Input
					id="fullName"
					type="text"
					placeholder="Enter your full name"
					disabled={isPending}
					autoFocus
					{...field("fullName")}
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label htmlFor="password">Password</Label>
					{errors.password && (
						<p className="-mt-1 text-xs text-destructive/60 font-medium italic">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="Create a password"
						className="pr-10"
						disabled={isPending}
						{...field("password")}
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
				<p className="text-xs text-muted-foreground">
					Must be at least 8 characters with uppercase, lowercase, and a number.
				</p>
			</div>

			<Button type="submit" className="w-full" disabled={!isValid || isPending}>
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
