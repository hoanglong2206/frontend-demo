"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MessageCircle, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/core/config/route";
import { currentUser } from "../data/mock-data";

export function BottomNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: ROUTES.HOME, icon: Home, label: "Home" },
    { href: ROUTES.USER_DISCOVER, icon: Compass, label: "Explore" },
    { href: ROUTES.USER_CHAT, icon: MessageCircle, label: "Messages" },
    { href: `/${currentUser.username}`, icon: User, label: "Profile" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-around h-14">
        {navLinks.map(({ href, icon: Icon, label }) => {
          const active =
            href === `/${currentUser.username}`
              ? pathname.startsWith(`/${currentUser.username}`)
              : pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-4 py-2 transition-colors",
                active
                  ? "text-black dark:text-white"
                  : "text-gray-400 dark:text-gray-600"
              )}
            >
              <Icon className={cn("w-6 h-6", active && "fill-current")} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
