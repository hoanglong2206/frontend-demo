import { BottomNav, Sidebar } from "@/core/layouts/main";

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen flex flex-col">
			<Sidebar />
			<main className="flex-1 overflow-auto max-w-3xl mx-auto px-4 py-6">
				{children}
			</main>
			<BottomNav />
		</div>
	);
}
