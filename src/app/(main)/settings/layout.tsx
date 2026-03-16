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
			<div className="h-screen">
				<div className="flex flex-col xl:gap-6 mx-auto max-w-7xl h-full">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						className="bg-background p-4"
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

					<Separator className="hidden xl:block" />

					{/* Content */}
					<div className="flex-1 overflow-auto h-full flex flex-col">
						<div className="flex flex-1 flex-col xl:flex-row overflow-hidden py-1">
							{/* Sidebar */}
							<motion.aside
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
								className="w-72 border-r px-1 hidden xl:block"
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
														? "bg-primary/20 text-primary shadow-sm"
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
														className="ml-auto h-2 w-2 rounded-full bg-primary"
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

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
								className="flex items-center gap-1 px-1 border-b border-border xl:hidden relative"
							>
								{sidebarLinks.map((link) => {
									const isActive = pathname === link.href;
									return (
										<Link
											key={link.href}
											href={link.href}
											className={cn(
												"group relative inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
												isActive
													? "text-primary"
													: "text-muted-foreground hover:text-foreground",
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
											<span>{link.label}</span>
											{isActive && (
												<motion.div
													layoutId="mobile-nav-indicator"
													className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
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
							</motion.div>

							{/* Main content */}
							<motion.main
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
								className="flex-1 flex flex-col px-8 py-4 overflow-y-auto"
							>
								{children}
							</motion.main>
						</div>
					</div>
				</div>
			</div>
		</AuthGuard>
	);
};

export default SettingsLayout;
