"use client";

import { useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { getPasswordStrength } from "../domain/auth.rule";

// ══════ PASSWORD STRENGTH INDICATOR ══════

interface PasswordStrengthProps {
	password: string;
}

const strengthConfig = {
	weak: { label: "Weak", color: "bg-red-500", width: "w-1/3" },
	medium: { label: "Medium", color: "bg-yellow-500", width: "w-2/3" },
	strong: { label: "Strong", color: "bg-green-500", width: "w-full" },
} as const;

export function PasswordStrength({ password }: PasswordStrengthProps) {
	const strength = useMemo(() => getPasswordStrength(password), [password]);
	const config = strengthConfig[strength];

	if (!password) return null;

	return (
		<div className="space-y-1.5">
			<div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
				<div
					className={cn(
						"h-full rounded-full transition-all duration-300",
						config.color,
						config.width,
					)}
				/>
			</div>
			<p
				className={cn(
					"text-xs font-medium",
					strength === "weak" && "text-red-500",
					strength === "medium" && "text-yellow-600",
					strength === "strong" && "text-green-600",
				)}
			>
				{config.label} password
			</p>
		</div>
	);
}
