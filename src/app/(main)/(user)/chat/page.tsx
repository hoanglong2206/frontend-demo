"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, ArrowLeft, Phone, Video } from "lucide-react";
import { ConversationItem, ChatBox } from "@/features/instagram/components";
import { mockConversations, currentUser } from "@/features/instagram/data/mock-data";
import type { Conversation, Message } from "@/features/instagram/data/mock-data";
import { cn } from "@/shared/lib/utils";

export default function ChatPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  const handleSelectConversation = (conv: Conversation) => {
    setActiveId(conv.id);
    setMobileShowChat(true);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSend = () => {
    if (!inputText.trim() || !activeId) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: newMessage.text }
          : c
      )
    );
    setInputText("");
  };

  return (
    <div className="-mx-4 -my-6 h-[calc(100vh-56px)] flex overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-none sm:rounded-xl">
      {/* Left panel: conversation list */}
      <div
        className={cn(
          "flex flex-col w-full sm:w-80 border-r border-gray-200 dark:border-gray-800 shrink-0",
          mobileShowChat ? "hidden sm:flex" : "flex"
        )}
      >
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white text-lg">
            {currentUser.username}
          </h2>
          <p className="text-sm text-gray-500">Messages</p>
        </div>
        <div className="overflow-y-auto flex-1">
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={conv.id === activeId}
              onClick={() => handleSelectConversation(conv)}
            />
          ))}
        </div>
      </div>

      {/* Right panel: chat messages */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0",
          !mobileShowChat && activeConversation === null ? "hidden sm:flex" : "flex"
        )}
      >
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 shrink-0">
              <button
                className="sm:hidden p-1 -ml-1 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setMobileShowChat(false)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image
                  src={activeConversation.user.avatar}
                  alt={activeConversation.user.username}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  {activeConversation.user.username}
                </p>
                <p className="text-xs text-green-500">Active now</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {activeConversation.messages.map((msg) => (
                <ChatBox
                  key={msg.id}
                  text={msg.text}
                  isOwn={msg.senderId === currentUser.id}
                  timestamp={msg.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="text-blue-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">Your messages</p>
            <p className="text-sm text-gray-500">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
