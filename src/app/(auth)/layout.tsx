import { GuestGuard } from "@/core/guards";

interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<GuestGuard>
			<main className="flex min-h-screen items-center justify-center bg-background">
				{children}
			</main>
		</GuestGuard>
	);
};

export default AuthLayout;
