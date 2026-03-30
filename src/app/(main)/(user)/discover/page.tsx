"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { mockDiscoverPosts } from "@/features/instagram/data/mock-data";
import type { Post } from "@/features/instagram/data/mock-data";

function DiscoverPostTile({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative aspect-square cursor-pointer overflow-hidden rounded-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={post.image}
        alt={post.caption}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
      />
      {hovered && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 text-white">
          <span className="flex items-center gap-1 font-semibold text-sm">
            <Heart className="w-5 h-5 fill-white" />
            {post.likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 font-semibold text-sm">
            <MessageCircle className="w-5 h-5 fill-white" />
            {post.comments}
          </span>
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Explore</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-0.5">
        {mockDiscoverPosts.map((post) => (
          <DiscoverPostTile key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
