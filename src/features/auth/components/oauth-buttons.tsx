"use client";

import { Button } from "@/shared/components/ui/button";
import { Icons } from "@/shared/lib/icon";
import { Github } from "lucide-react";

// ══════ OAUTH BUTTONS ══════

interface OAuthButtonsProps {
	disabled?: boolean;
}

export function OAuthButtons({ disabled }: OAuthButtonsProps) {
	return (
		<div className="flex items-center gap-3 w-full">
			<Button
				type="button"
				variant="outline"
				className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
				disabled={disabled}
				onClick={() => {
					// OAuth flow placeholder
					console.log("[Mock] GitHub OAuth initiated");
				}}
			>
				<Github className="h-4 w-4" />
				GitHub
			</Button>
			<Button
				type="button"
				variant="outline"
				className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
				disabled={disabled}
				onClick={() => {
					// OAuth flow placeholder
					console.log("[Mock] Google OAuth initiated");
				}}
			>
				<Icons.google className="h-4 w-4" />
				Google
			</Button>
		</div>
	);
}
