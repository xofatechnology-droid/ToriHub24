"use client";

import { useState, useTransition } from "react";
import { deletePostAction } from "../actions/postActions";

export const useDeletePost = (postId: string) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const deletePost = () => {
    setError(null);
    
    startTransition(async () => {
      const result = await deletePostAction(postId);
      
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return { deletePost, isPending, error };
};