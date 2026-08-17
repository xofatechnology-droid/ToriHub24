"use client";

import { useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@torihub/ui/components/card";
import { Button } from "@torihub/ui/components/button";
import { formatRelativeTime } from "@/lib/utils";
import { likePost } from "../api/likePost";
import type { PostWithAuthor } from "../types";

export function PostCard({ post }: { post: PostWithAuthor }) {
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      await likePost(post.id);
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg hover:underline cursor-pointer">
          {post.author.name}
        </CardTitle>
        <span className="text-sm text-gray-500">
          {formatRelativeTime(post.createdAt)}
        </span>
      </CardHeader>
      
      <CardContent>
        <p className="whitespace-pre-wrap text-gray-900 leading-relaxed">
          {post.content}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-gray-50 pb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          disabled={isPending}
          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
        >
          {/* Note: In a real app, you'd check if the CURRENT user liked it to change the icon color */}
          ❤️ Like {post._count.likes > 0 && `(${post._count.likes})`}
        </Button>
      </CardFooter>
    </Card>
  );
}