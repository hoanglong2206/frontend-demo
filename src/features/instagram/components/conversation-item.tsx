import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { Conversation } from "../data/mock-data";

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
}

export function ConversationItem({
  conversation,
  isActive = false,
  onClick,
}: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-left",
        isActive && "bg-gray-50 dark:bg-gray-900"
      )}
    >
      <div className="relative shrink-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={conversation.user.avatar}
            alt={conversation.user.name}
            fill
            className="object-cover"
          />
        </div>
        {conversation.unread > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-black" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "text-sm truncate",
              conversation.unread > 0
                ? "font-semibold text-gray-900 dark:text-white"
                : "text-gray-700 dark:text-gray-300"
            )}
          >
            {conversation.user.username}
          </p>
          <span className="text-xs text-gray-400 shrink-0 ml-1">
            {conversation.timestamp}
          </span>
        </div>
        <p
          className={cn(
            "text-xs truncate mt-0.5",
            conversation.unread > 0
              ? "text-gray-800 dark:text-gray-200 font-medium"
              : "text-gray-400"
          )}
        >
          {conversation.lastMessage}
        </p>
      </div>
      {conversation.unread > 0 && (
        <span className="shrink-0 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
          {conversation.unread}
        </span>
      )}
    </button>
  );
}
