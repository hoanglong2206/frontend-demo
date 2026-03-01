// components/ui/toaster.tsx  (hoặc tương tự)
"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
	CircleCheckIcon,
	InfoIcon,
	TriangleAlertIcon,
	OctagonXIcon,
	Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={(theme as ToasterProps["theme"]) ?? "light"}
			className="toaster group"
			richColors
			position="top-right"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",

					success:
						"border-green-500/30 bg-green-50/80 text-green-900 dark:bg-green-950/30 dark:text-green-100 dark:border-green-800/40",
					error:
						"border-red-500/30 bg-red-50/80 text-red-900 dark:bg-red-950/30 dark:text-red-100 dark:border-red-800/40",
					warning:
						"border-yellow-500/30 bg-yellow-50/80 text-yellow-900 dark:bg-yellow-950/30 dark:text-yellow-100 dark:border-yellow-800/40",
					info: "border-blue-500/30 bg-blue-50/80 text-blue-900 dark:bg-blue-950/30 dark:text-blue-100 dark:border-blue-800/40",

					title: "group-[.toast]:text-foreground group-[.toast]:font-semibold",
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
