"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/core/layouts/components";
import { ROUTES } from "@/core/config/route";
import {
	forgotPasswordSchema,
	type ForgotPasswordFormValues,
} from "../domain/auth.schemas";
import { useForgotPassword } from "../hooks/use-forgot-password";

export function ForgotPasswordForm() {
	const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const emailValue = watch("email");

	const onSubmit = (data: ForgotPasswordFormValues) => {
		forgotPassword(data);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="w-full max-w-md mx-auto"
		>
			<Card className="w-full">
				<CardHeader className="space-y-1 text-center flex flex-col items-center justify-center">
					<motion.div className="flex items-center justify-center">
						<Logo />
					</motion.div>
					<CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
					<CardDescription className="w-2/3 text-center">
						Enter your email address and we&apos;ll send you a password reset
						link.
					</CardDescription>
				</CardHeader>

				{isSuccess ? (
					<CardContent className="px-8">
						<div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950">
							<Mail className="mx-auto mb-3 h-12 w-12 text-green-600 dark:text-green-400" />
							<h3 className="font-semibold text-green-900 dark:text-green-100">
								Check your email
							</h3>
							<p className="mt-2 text-sm text-green-800 dark:text-green-200">
								If an account exists for {emailValue}, we sent a reset link.
							</p>
						</div>
					</CardContent>
				) : (
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
							</motion.div>
						</CardContent>

						<CardFooter className="flex flex-col gap-3 px-8">
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Sending reset link...
									</>
								) : (
									"Send reset link"
								)}
							</Button>
							<Link href={ROUTES.LOGIN} className="w-full">
								<Button variant="outline" className="w-full" type="button">
									<ArrowLeft className="mr-2 h-4 w-4" />
									Back to sign in
								</Button>
							</Link>
						</CardFooter>
					</form>
				)}

				{isSuccess && (
					<CardFooter className="px-8">
						<Link href={ROUTES.LOGIN} className="w-full">
							<Button variant="outline" className="w-full" type="button">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to sign in
							</Button>
						</Link>
					</CardFooter>
				)}
			</Card>
		</motion.div>
	);
}
