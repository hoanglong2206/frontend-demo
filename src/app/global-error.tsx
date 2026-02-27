"use client";

import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { ShieldAlert } from "lucide-react";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html>
			<body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white p-4 text-center font-sans">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
					<ShieldAlert className="h-8 w-8 text-red-600" />
				</div>
				<div className="space-y-2">
					<h1 className="text-2xl font-bold tracking-tight text-gray-900">
						Critical error
					</h1>
					<p className="text-sm text-gray-500 max-w-md">
						{error.message ||
							"A critical application error occurred. Please refresh the page."}
					</p>
					{error.digest && (
						<p className="text-xs text-gray-400">Error ID: {error.digest}</p>
					)}
				</div>
				<div className="flex gap-3">
					<Button
						onClick={() => (window.location.href = "/")}
						className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Go Home
					</Button>
					<Button
						onClick={reset}
						className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
					>
						Try again
					</Button>
				</div>
			</body>
		</html>
	);
};

export default GlobalError;
