import { AuthGuard } from "@/core/guards";

interface AiLayoutProps {
	children: React.ReactNode;
}

const AiLayout = ({ children }: AiLayoutProps) => {
	return <AuthGuard>{children}</AuthGuard>;
};

export default AiLayout;
