"use client";

import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4 text-center">
			<div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
				<AlertCircle className="h-8 w-8 text-destructive" />
			</div>
			<div className="space-y-2">
				<h1 className="text-2xl font-bold tracking-tight">
					Something went wrong
				</h1>
				<p className="text-sm text-muted-foreground max-w-md">
					{error.message || "An unexpected error occurred. Please try again."}
				</p>
				{error.digest && (
					<p className="text-xs text-muted-foreground/60">
						Error ID: {error.digest}
					</p>
				)}
			</div>
			<div className="flex gap-3">
				<Button variant="outline" onClick={() => (window.location.href = "/")}>
					Go Home
				</Button>
				<Button onClick={reset}>Try again</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
