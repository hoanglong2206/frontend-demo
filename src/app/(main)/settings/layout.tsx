import { AuthGuard } from "@/core/guards";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
	return <AuthGuard>{children}</AuthGuard>;
};

export default SettingsLayout;
