"use client";

import { PostCard, Story } from "@/features/instagram/components";
import { mockFeedPosts, mockStories, currentUser } from "@/features/instagram/data/mock-data";

export default function HomePage() {
  const ownStory = {
    id: "own",
    user: currentUser,
    hasUnread: false,
  };

  return (
    <div className="space-y-6">
      {/* Stories section */}
      <section className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-1">
          <Story story={ownStory} isOwn />
          {mockStories.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Feed posts */}
      <section className="space-y-4">
        {mockFeedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {/* End-of-feed message */}
      <p className="text-center text-sm text-gray-400 py-4">
        You&apos;ve seen all posts ✨
      </p>
    </div>
  );
}
