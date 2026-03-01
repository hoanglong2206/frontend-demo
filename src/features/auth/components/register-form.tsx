"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/shared/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/core/layouts/components";
import { OAuthButtons } from "./oauth-buttons";
import { RegisterEmailStep } from "./register-email-step";
import { RegisterOtpStep } from "./register-otp-step";
import { RegisterAccountStep } from "./register-account-step";
import { useRegisterStore } from "../store/register.store";

const STEP_INFO = {
	email: {
		title: "Create an account",
		description: "Enter your email to get started",
	},
	otp: {
		title: "Verify your email",
		description: "Enter the 6-digit code we sent you",
	},
	account: {
		title: "Complete your profile",
		description: "Fill in your details to finish registration",
	},
} as const;

const STEP_ORDER = ["email", "otp", "account"] as const;

export function RegisterForm() {
	const { step, goToStep } = useRegisterStore();

	const stepIndex = STEP_ORDER.indexOf(step);

	const handleBack = () => {
		const prevStep = STEP_ORDER[stepIndex - 1];
		if (stepIndex > 0 && prevStep) goToStep(prevStep);
	};

	const { title, description } = STEP_INFO[step];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="w-full max-w-md mx-auto"
		>
			<Card className="w-full">
				<CardHeader className="space-y-1 text-center">
					{/* Step indicators */}
					<div className="flex justify-center gap-2 mb-4">
						{STEP_ORDER.map((s, i) => (
							<div
								key={s}
								className={`h-2 w-8 rounded-full transition-colors ${
									i <= stepIndex ? "bg-primary" : "bg-muted"
								}`}
							/>
						))}
					</div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className="flex items-center justify-center"
					>
						<Logo />
					</motion.div>

					<CardTitle className="text-2xl font-bold">{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>

				<CardContent className="px-8">
					<AnimatePresence mode="wait">
						<motion.div
							key={step}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
						>
							{step === "email" && <RegisterEmailStep />}
							{step === "otp" && (
								<div className="space-y-4">
									<RegisterOtpStep />
									<div className="flex justify-start">
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-auto px-0 text-xs text-muted-foreground hover:text-foreground gap-1.5"
											onClick={handleBack}
										>
											<ArrowLeft className="h-3 w-3" />
											Change email
										</Button>
									</div>
								</div>
							)}
							{step === "account" && <RegisterAccountStep />}
						</motion.div>
					</AnimatePresence>
				</CardContent>

				<CardFooter className="flex flex-col gap-4 px-8">
					{/* Social login — only on email step */}
					{step === "email" && (
						<>
							<div className="relative w-full">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-card px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>
							<OAuthButtons />
						</>
					)}

					<p className="text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link href="/login" className="text-primary hover:underline">
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
