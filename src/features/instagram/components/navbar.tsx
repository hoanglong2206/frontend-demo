"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Compass, MessageCircle, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/core/config/route";

export function InstagramNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: ROUTES.HOME, icon: Home, label: "Home" },
    { href: ROUTES.USER_DISCOVER, icon: Compass, label: "Discover" },
    { href: ROUTES.USER_CHAT, icon: MessageCircle, label: "Messages" },
    { href: "/you", icon: User, label: "Profile" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent select-none">
            Photogram
          </span>
        </Link>

        {/* Search bar (hidden on mobile) */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 w-64">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm outline-none w-full text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
          />
        </div>

        {/* Nav icons (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, icon: Icon, label }) => {
            const active =
              href === "/you"
                ? pathname.startsWith("/you")
                : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={label}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  active
                    ? "text-black dark:text-white"
                    : "text-gray-500 hover:text-black dark:hover:text-white"
                )}
              >
                <Icon className={cn("w-6 h-6", active && "fill-current")} />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
