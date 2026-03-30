"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MessageCircle, User, Settings } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/core/config/route";
import Image from "next/image";
import { currentUser } from "../data/mock-data";

export function InstagramSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: ROUTES.HOME, icon: Home, label: "Home" },
    { href: ROUTES.USER_DISCOVER, icon: Compass, label: "Explore" },
    { href: ROUTES.USER_CHAT, icon: MessageCircle, label: "Messages" },
    { href: `/${currentUser.username}`, icon: User, label: "Profile" },
    { href: ROUTES.SETTINGS_PROFILE, icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-14 bottom-0 w-56 xl:w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-3 py-4 gap-1 z-40">
      {navLinks.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || (href !== ROUTES.HOME && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors font-medium",
              active
                ? "bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white"
            )}
          >
            <Icon className={cn("w-5 h-5 shrink-0", active && "stroke-[2.5]")} />
            <span className="text-sm">{label}</span>
          </Link>
        );
      })}

      {/* Current user quick link */}
      <div className="mt-auto">
        <Link
          href={`/${currentUser.username}`}
          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-pink-400">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-black dark:text-white truncate">
              {currentUser.username}
            </span>
            <span className="text-xs text-gray-500 truncate">{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
