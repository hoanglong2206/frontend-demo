"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	Home,
	Send,
	Search,
	Compass,
	PlusSquare,
	User,
	Menu,
} from "lucide-react";

interface NavItem {
	icon: React.ElementType;
	label: string;
	href: string;
}

const navItems: NavItem[] = [
	{ icon: Home, label: "Home", href: "/home" },
	{ icon: Search, label: "Search", href: "#" },
	{ icon: Compass, label: "Discover", href: "/discover" },
	{ icon: Send, label: "Message", href: "/chat" },
	{ icon: PlusSquare, label: "Create", href: "#" },
];

export function Sidebar() {
	const pathname = usePathname();
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	return (
		<aside
			className={`
				hidden md:flex flex-col fixed left-0 top-1/2 -translate-y-1/2  
				bg-teal-400 z-50 rounded-r-lg
				transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
				${isExpanded ? "w-50" : "w-16"}
			`}
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
		>
			{/* Navigation Items */}
			<nav className="flex-1 flex flex-col gap-1.5 pt-4 px-2">
				{navItems.map((item) => {
					const isActive = pathname?.startsWith(item.href);
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors duration-200 ${isActive ? "font-semibold" : "font-normal"}`}
						>
							{/* Icon container */}
							<div className="relative shrink-0 w-6 h-6">
								<Icon
									className={`w-6 h-6 text-white transition-transform duration-200 group-hover:scale-105 ${
										isActive ? "stroke-[2.5]" : "stroke-[1.5]"
									}`}
								/>
							</div>

							{/* Label */}
							<span
								className={`
									text-white text-[15px] whitespace-nowrap
									transition-all duration-300
									${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
								`}
							>
								{item.label}
							</span>
						</Link>
					);
				})}
			</nav>

			{/* Bottom items */}
			<div className="flex flex-col gap-0.5 pb-4 px-2 mt-1.5">
				{/* Profile */}
				<Link
					href="/profile"
					className="group relative flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/10"
				>
					<div className="relative shrink-0 w-6 h-6">
						<div className="w-6 h-6 rounded-full bg-white overflow-hidden flex items-center justify-center">
							<User className="w-4 h-4 text-white" />
						</div>
					</div>
					<span
						className={`
							text-white text-[15px] whitespace-nowrap
							transition-all duration-300
							${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
						`}
					>
						Profile
					</span>
				</Link>

				{/* Divider */}
				<div
					className={`
						mx-3 my-2 h-px bg-white/30 
						transition-opacity duration-300
						${isExpanded ? "opacity-100" : "opacity-0"}
					`}
				/>

				{/* More menu */}
				<button className="group relative flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/10 w-full text-left cursor-pointer">
					<div className="relative shrink-0 w-6 h-6">
						<Menu className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-105 stroke-[1.5]" />
					</div>
					<span
						className={`
							text-white text-[15px] whitespace-nowrap
							transition-all duration-300
							${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
						`}
					>
						More
					</span>
				</button>
			</div>
		</aside>
	);
}
