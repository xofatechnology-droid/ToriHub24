"use client";

import { useState, useTransition } from "react";
import { createPost } from "../api/createPost";
import { Card, CardContent, CardFooter } from "@torihub/ui/components/card";
import { Button } from "@torihub/ui/components/button";
import { PLATFORM_LIMITS } from "@/lib/constants";

export function CreatePostInput() {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const charsRemaining = PLATFORM_LIMITS.MAX_POST_LENGTH - content.length;
  const isOverLimit = charsRemaining < 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (isOverLimit || content.trim().length === 0) return;

    startTransition(async () => {
      const result = await createPost(content);
      
      if (result.success) {
        setContent(""); // Clear input on success
      } else {
        setError(result.error || "Failed to post.");
      }
    });
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full resize-none outline-none text-lg min-h-[100px] bg-transparent disabled:opacity-50"
            disabled={isPending}
            autoFocus
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </CardContent>
        
        <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4 pb-4">
          <span className={`text-sm font-medium ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
            {charsRemaining}
          </span>
          <Button 
            type="submit" 
            disabled={isPending || isOverLimit || content.trim().length === 0}
          >
            {isPending ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}