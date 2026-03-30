import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProviders } from "@/core/providers";

export const metadata: Metadata = {
	title: "Photogram",
	description: "An Instagram-inspired social media app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased font-sans">
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}

