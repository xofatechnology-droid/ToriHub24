import { getPosts } from "@/features/posts/api/getPosts";
import { CreatePostInput } from "@/features/posts/components/CreatePostInput";
import { PostCard } from "@/features/posts/components/PostCard";
import type { PostWithAuthor } from "@/features/posts/types";

export const metadata = {
  title: "Feed | ToriHub24",
  description: "Community activity and posts on ToriHub24",
};

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const result = await getPosts();
  const posts = result.success ? (result.data as PostWithAuthor[]) : [];

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold tracking-tight mb-6 text-gray-900">
        Community Feed
      </h1>

      <CreatePostInput />

      {!result.success ? (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          Failed to load feed posts. Please refresh or try again shortly.
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm">
          <p className="text-gray-500">No posts yet. Share something with the community!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}