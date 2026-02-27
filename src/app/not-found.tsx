import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

const NotFound = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4 text-center">
			<div className="space-y-1">
				<h1 className="text-8xl font-extrabold tracking-tight text-primary">
					404
				</h1>
				<p className="text-xl font-semibold">Page not found</p>
				<p className="text-sm text-muted-foreground max-w-sm">
					The page you are looking for does not exist or has been moved.
				</p>
			</div>
			<Button asChild>
				<Link href="/">Back to Home</Link>
			</Button>
		</div>
	);
};

export default NotFound;
