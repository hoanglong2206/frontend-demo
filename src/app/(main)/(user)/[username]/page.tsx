"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";
import { ProfileHeader } from "@/features/instagram/components";
import { mockUsers, currentUser, mockProfilePosts, mockFeedPosts } from "@/features/instagram/data/mock-data";
import type { Post } from "@/features/instagram/data/mock-data";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts.map((post) => (
        <div key={post.id} className="relative aspect-square overflow-hidden cursor-pointer group">
          <Image
            src={post.image}
            alt={post.caption}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 33vw, 200px"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-semibold">❤️ {post.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);

  // Check if it's the current user
  if (username === currentUser.username || username === "you") {
    return (
      <div className="-mx-4 -my-6">
        <ProfileHeader user={currentUser} isOwn />
        <PostGrid posts={mockProfilePosts} />
      </div>
    );
  }

  // Check mock users
  const user = mockUsers.find((u) => u.username === username);
  if (!user) {
    notFound();
  }

  // Get some posts from mock feed for this user
  const userPosts = mockFeedPosts.filter((p) => p.user.id === user.id);

  return (
    <div className="-mx-4 -my-6">
      <ProfileHeader user={user} />
      {userPosts.length > 0 ? (
        <PostGrid posts={userPosts} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-gray-400 text-sm">No posts yet</p>
        </div>
      )}
    </div>
  );
}
