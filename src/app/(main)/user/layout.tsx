import { AuthGuard } from "@/core/guards";

interface UserLayoutProps {
	children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
	return <AuthGuard>{children}</AuthGuard>;
};

export default UserLayout;
