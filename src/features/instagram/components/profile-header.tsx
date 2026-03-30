import Image from "next/image";
import { BadgeCheck, Grid3X3 } from "lucide-react";
import type { User } from "../data/mock-data";

interface ProfileHeaderProps {
  user: User;
  isOwn?: boolean;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function ProfileHeader({ user, isOwn = false }: ProfileHeaderProps) {
  return (
    <div className="px-4 py-6">
      {/* Avatar + stats row */}
      <div className="flex items-center gap-6 md:gap-12 mb-4">
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 ring-2 ring-offset-2 dark:ring-offset-black ring-pink-400">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-1">
              {user.username}
              {user.isVerified && (
                <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500" />
              )}
            </h2>
            {isOwn ? (
              <button className="px-4 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Edit profile
              </button>
            ) : (
              <button className="px-5 py-1.5 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Follow
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center md:flex-row md:gap-1">
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                {user.postsCount}
              </span>
              <span className="text-gray-500 text-sm">posts</span>
            </div>
            <div className="flex flex-col items-center md:flex-row md:gap-1">
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                {formatCount(user.followers)}
              </span>
              <span className="text-gray-500 text-sm">followers</span>
            </div>
            <div className="flex flex-col items-center md:flex-row md:gap-1">
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                {formatCount(user.following)}
              </span>
              <span className="text-gray-500 text-sm">following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Name + bio */}
      <div className="mb-4">
        <p className="font-semibold text-sm text-gray-900 dark:text-white">{user.name}</p>
        {user.bio && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">
            {user.bio}
          </p>
        )}
      </div>

      {/* Posts tab indicator */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-3 flex justify-center">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white pb-1 -mt-3 pt-2 px-4">
          <Grid3X3 className="w-4 h-4" />
          POSTS
        </div>
      </div>
    </div>
  );
}
