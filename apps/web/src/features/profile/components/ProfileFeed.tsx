"use client";

import { PostCard } from "@/features/posts/components/PostCard";
import type { PostWithAuthor } from "@/features/posts/types";

type ProfileFeedProps = {
  posts: PostWithAuthor[];
  userName: string;
};

export function ProfileFeed({ posts, userName }: ProfileFeedProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg border border-gray-100 mt-6">
        <p className="text-gray-500">{userName} hasn&apos;t posted anything yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Posts</h3>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}