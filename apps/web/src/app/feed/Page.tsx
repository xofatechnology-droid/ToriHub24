import { getPosts } from "@/features/posts/api/getPosts";
import { CreatePostInput } from "@/features/posts/components/CreatePostInput";
import { PostCard } from "@/features/posts/components/PostCard";
import type { PostWithAuthor } from "@/features/posts/types";

export const metadata = {
  title: "Feed | ToriHub24",
  description: "Community activity and posts on ToriHub24",
};

export const revalidate = 0; // Disable static caching to serve real-time feed updates

export default async function FeedPage() {
  const result = await getPosts();
  const posts = result.success && result.data ? (result.data as PostWithAuthor[]) : [];

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold tracking-tight mb-6 text-gray-900">
        Community Feed
      </h1>

      <CreatePostInput />

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
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