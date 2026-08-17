"use client";

import { useState, useEffect, useCallback } from "react";
import { getPosts } from "../api/getPosts";
import type { PostWithAuthor } from "../types";

export function usePosts(initialData: PostWithAuthor[] = []) {
  // If you pass initialData from a Server Component, it renders instantly
  const [posts, setPosts] = useState<PostWithAuthor[]>(initialData);
  const [isLoading, setIsLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    // Prevent setting loading state if we already have initial data on first mount
    if (posts.length === 0) setIsLoading(true);
    setError(null);

    try {
      const result = await getPosts();
      
      if (result.success && result.data) {
        setPosts(result.data as PostWithAuthor[]);
      } else {
        setError(result.error || "Failed to load feed.");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching posts.");
    } finally {
      setIsLoading(false);
    }
  }, [posts.length]);

  useEffect(() => {
    // Only fetch on mount if we didn't receive initial data from the server
    if (initialData.length === 0) {
      fetchPosts();
    }
  }, [initialData.length, fetchPosts]);

  return { 
    posts, 
    isLoading, 
    error, 
    refetch: fetchPosts 
  };
}