"use client";

import { useState, useTransition } from "react";
import { createPost } from "../api/createPost";
import { Card, CardContent, CardFooter } from "@torihub/ui/components/Card";
import { Button } from "@torihub/ui/components/Button";
import { PLATFORM_LIMITS } from "@/lib/constants";

export function CreatePostInput() {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const charsRemaining = PLATFORM_LIMITS.MAX_POST_LENGTH - content.length;
  const isOverLimit = charsRemaining < 0;
  const isNearLimit = charsRemaining <= 20 && !isOverLimit;

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    setError(null);

    if (isOverLimit || content.trim().length === 0 || isPending) return;

    startTransition(async () => {
      const result = await createPost(content);

      if (result.success) {
        setContent(""); // Clear input on success
      } else {
        setError(result.error || "Failed to post.");
      }
    });
  };

  // Allow posting via Cmd + Enter or Ctrl + Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="mb-6 shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind?"
            aria-label="Create a post"
            className="w-full resize-none outline-none text-lg min-h-[100px] bg-transparent disabled:opacity-50 text-gray-900 placeholder:text-gray-400"
            disabled={isPending}
            autoFocus
          />
          {error && (
            <p role="alert" className="text-sm text-red-600 mt-2 font-medium">
              {error}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-3 pb-3">
          <span
            className={`text-sm transition-colors ${
              isOverLimit
                ? "text-red-500 font-semibold"
                : isNearLimit
                ? "text-amber-500 font-medium"
                : "text-gray-400"
            }`}
          >
            {charsRemaining}
          </span>
          <Button
            type="submit"
            disabled={isPending || isOverLimit || content.trim().length === 0}
            className="bg-[#E86C25] hover:bg-[#c95d1f] text-white"
          >
            {isPending ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}