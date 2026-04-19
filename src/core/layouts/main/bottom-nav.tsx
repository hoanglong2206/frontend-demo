"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Compass, Send, PlusSquare, User } from "lucide-react";

interface NavItem {
	icon: React.ElementType;
	label: string;
	href: string;
	hasNotificationDot?: boolean;
}

const bottomNavItems: NavItem[] = [
	{ icon: Home, label: "Home", href: "/home" },
	{ icon: Search, label: "Search", href: "#" },
	{ icon: Compass, label: "Discover", href: "/discover" },
	{ icon: Send, label: "Message", href: "/chat" },
	{ icon: PlusSquare, label: "Create", href: "#" },
	{ icon: User, label: "Profile", href: "/profile" },
];

export function BottomNav() {
	const pathname = usePathname();

	return (
		<nav className="md:hidden fixed inset-x-0 bottom-0 z-50 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] px-3 pointer-events-none">
			<div className="pointer-events-auto rounded-2xl bg-teal-500 border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
				<div className="flex items-center justify-between h-16 px-1.5">
					{bottomNavItems.map((item) => {
						const isActive =
							item.href !== "#" && pathname?.startsWith(item.href);
						const Icon = item.icon;

						return (
							<Link
								key={item.label}
								href={item.href}
								className={`group relative flex flex-1 py-2.5 flex-col items-center justify-center rounded-xl transition-colors duration-200 active:scale-95 ${
									isActive ? "bg-white/15" : "bg-transparent"
								}`}
							>
								<div className="relative mb-0.5">
									<Icon
										className={`w-6 h-6 text-white transition-transform duration-200 group-active:scale-90 ${
											isActive ? "stroke-[2.5]" : "stroke-[1.5]"
										}`}
									/>
								</div>

								<span
									className={`text-[10px] leading-none transition-opacity duration-200 ${
										isActive
											? "text-white opacity-100 font-semibold"
											: "text-white/80 opacity-90"
									}`}
								>
									{item.label}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
