"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { Story as StoryType } from "../data/mock-data";

interface StoryProps {
  story: StoryType;
  isOwn?: boolean;
}

export function Story({ story, isOwn = false }: StoryProps) {
  return (
    <button className="flex flex-col items-center gap-1.5 shrink-0 group">
      <div
        className={cn(
          "relative w-16 h-16 rounded-full p-0.5",
          story.hasUnread
            ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
            : "bg-gray-300 dark:bg-gray-600"
        )}
      >
        <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white dark:ring-black">
          <Image
            src={story.user.avatar}
            alt={story.user.username}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        {isOwn && (
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-black">
            <span className="text-white text-xs font-bold leading-none">+</span>
          </div>
        )}
      </div>
      <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[64px]">
        {isOwn ? "Your story" : story.user.username}
      </span>
    </button>
  );
}
