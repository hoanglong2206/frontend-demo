"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, Shield, Settings } from "lucide-react";
import { AuthGuard } from "@/core/guards";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/core/config/route";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

const sidebarLinks = [
	{
		label: "Profile",
		href: ROUTES.SETTINGS_PROFILE,
		icon: User,
		description: "Manage your personal information",
	},
	{
		label: "Security",
		href: ROUTES.SETTINGS_SECURITY,
		icon: Shield,
		description: "Password and authentication",
	},
];

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
	const pathname = usePathname();

	return (
		<AuthGuard>
			<div className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						className="sticky top-0 z-20 mb-8 -mx-4 -mt-8 bg-background px-4 py-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
					>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
								<Settings className="h-5 w-5 text-primary" />
							</div>
							<div>
								<h1 className="text-2xl font-bold tracking-tight text-foreground">
									Settings
								</h1>
								<p className="text-sm text-muted-foreground">
									Manage your account preferences and security
								</p>
							</div>
						</div>
					</motion.div>

					<Separator className="mb-8" />

					{/* Content */}
					<div className="flex flex-col gap-8 lg:flex-row lg:gap-0 lg:h-full">
						{/* Sidebar */}
						<motion.aside
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
							className="w-full shrink-0 lg:w-64 lg:border-r lg:overflow-y-auto lg:sticky lg:h-full"
						>
							<nav className="space-y-1">
								{sidebarLinks.map((link) => {
									const isActive = pathname === link.href;
									return (
										<Link
											key={link.href}
											href={link.href}
											className={cn(
												"group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
												isActive
													? "bg-primary/10 text-primary shadow-sm"
													: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
											)}
										>
											<link.icon
												className={cn(
													"h-4 w-4 shrink-0 transition-colors",
													isActive
														? "text-primary"
														: "text-muted-foreground group-hover:text-accent-foreground",
												)}
											/>
											<div className="flex flex-col">
												<span>{link.label}</span>
												<span
													className={cn(
														"text-xs font-normal transition-colors",
														isActive
															? "text-primary/70"
															: "text-muted-foreground/60",
													)}
												>
													{link.description}
												</span>
											</div>
											{isActive && (
												<motion.div
													layoutId="settings-active-indicator"
													className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
													transition={{
														type: "spring",
														stiffness: 380,
														damping: 30,
													}}
												/>
											)}
										</Link>
									);
								})}
							</nav>
						</motion.aside>

						{/* Main content */}
						<motion.main
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
							className="min-w-0 flex-1 overflow-y-auto lg:px-8"
						>
							{children}
						</motion.main>
					</div>
				</div>
			</div>
		</AuthGuard>
	);
};

export default SettingsLayout;
