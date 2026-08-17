import { getPosts } from "@/features/posts/api/getPosts";
import { PostCard } from "@/features/posts/components/PostCard";

export default async function FeedPage() {
  const result = await getPosts();

  if (!result.success || !result.data) {
    return <div className="text-center p-8 text-red-500">Failed to load feed.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
      
      {result.data.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No posts yet. Be the first!</p>
      ) : (
        result.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}