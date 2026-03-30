"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, BadgeCheck } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Post } from "../data/mock-data";

interface PostCardProps {
  post: Post;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.isLiked);
  const [saved, setSaved] = useState(post.isSaved);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <article className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href={`/${post.user.username}`}>
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-pink-400 ring-offset-1 dark:ring-offset-black">
              <Image
                src={post.user.avatar}
                alt={post.user.username}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href={`/${post.user.username}`}
              className="text-sm font-semibold hover:underline text-gray-900 dark:text-white"
            >
              {post.user.username}
            </Link>
            {post.user.isVerified && (
              <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />
            )}
            <span className="text-gray-400 text-sm">· {post.timestamp}</span>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-900">
        <Image
          src={post.image}
          alt={post.caption}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 600px"
        />
      </div>

      {/* Actions */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="transition-transform active:scale-90"
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Heart
                className={cn(
                  "w-6 h-6 transition-colors",
                  liked ? "fill-red-500 stroke-red-500" : "stroke-gray-800 dark:stroke-gray-200"
                )}
              />
            </button>
            <button className="transition-transform active:scale-90" aria-label="Comment">
              <MessageCircle className="w-6 h-6 stroke-gray-800 dark:stroke-gray-200" />
            </button>
            <button className="transition-transform active:scale-90" aria-label="Share">
              <Send className="w-6 h-6 stroke-gray-800 dark:stroke-gray-200" />
            </button>
          </div>
          <button
            onClick={() => setSaved((prev) => !prev)}
            className="transition-transform active:scale-90"
            aria-label={saved ? "Unsave" : "Save"}
          >
            <Bookmark
              className={cn(
                "w-6 h-6 transition-colors",
                saved ? "fill-gray-800 stroke-gray-800 dark:fill-white dark:stroke-white" : "stroke-gray-800 dark:stroke-gray-200"
              )}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {formatCount(likeCount)} likes
        </p>

        {/* Caption */}
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
          <Link
            href={`/${post.user.username}`}
            className="font-semibold mr-1 hover:underline"
          >
            {post.user.username}
          </Link>
          {post.caption}
        </p>

        {/* Comments link */}
        {post.comments > 0 && (
          <button className="text-sm text-gray-400 mt-1">
            View all {post.comments} comments
          </button>
        )}
      </div>
    </article>
  );
}
