"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Logo } from "@/core/layouts/components";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/core/config/route";
import { loginSchema, type LoginFormValues } from "../domain/auth.schemas";
import { useLogin } from "../hooks/use-login";
import { OAuthButtons } from "./oauth-buttons";
import { useState } from "react";
import { toast } from "@/shared/hooks/use-toast";

export function LoginForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: login, isPending } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormValues) => {
		login(data, {
			onSuccess: () => {
				toast.success("Welcome back!");
				router.push(ROUTES.HOME);
			},
			onError: (err: unknown) => {
				const message =
					(err as { response?: { data?: { message?: string } } })?.response
						?.data?.message ?? "Invalid email or password.";
				toast.error(message);
			},
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="w-full max-w-md mx-auto"
		>
			<Card className="w-full">
				<CardHeader className="space-y-1 text-center">
					<motion.div className="flex items-center justify-center">
						<Logo />
					</motion.div>
					<CardTitle className="text-2xl font-bold">
						Sign in to your account
					</CardTitle>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="px-8">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							className="space-y-4"
						>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="email">Email</Label>
									{errors.email && (
										<p className="-mt-1 text-xs text-destructive/60 font-medium italic">
											{errors.email.message}
										</p>
									)}
								</div>
								<Input
									id="email"
									type="email"
									placeholder="name@example.com"
									disabled={isPending}
									autoFocus
									{...register("email")}
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
										placeholder="Enter your password"
										disabled={isPending}
										{...register("password")}
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
								<div className="flex justify-end">
									<Link
										href={ROUTES.FORGOT_PASSWORD}
										className="text-sm text-primary hover:underline"
									>
										Forgot password?
									</Link>
								</div>
							</div>
						</motion.div>
					</CardContent>

					<CardFooter className="flex flex-col gap-4 px-8">
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Signing in...
								</>
							) : (
								"Sign In"
							)}
						</Button>
						<div className="relative w-full">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground font-medium">
									Or continue with
								</span>
							</div>
						</div>
						<OAuthButtons />
						<p className="text-center text-sm text-muted-foreground">
							Don&apos;t have an account?{" "}
							<Link
								href={ROUTES.REGISTER}
								className="text-primary hover:underline"
							>
								Create account
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</motion.div>
	);
}
