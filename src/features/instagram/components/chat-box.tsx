import { cn } from "@/shared/lib/utils";

interface ChatBoxProps {
  text: string;
  isOwn: boolean;
  timestamp: string;
}

export function ChatBox({ text, isOwn, timestamp }: ChatBoxProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 max-w-xs",
        isOwn ? "items-end self-end" : "items-start self-start"
      )}
    >
      <div
        className={cn(
          "px-4 py-2 rounded-2xl text-sm leading-relaxed",
          isOwn
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm"
        )}
      >
        {text}
      </div>
      <span className="text-xs text-gray-400 px-1">{timestamp}</span>
    </div>
  );
}
