"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLikePost } from "../api/toggleLikePost";

type LikeState = {
  likeCount: number;
  isLiked: boolean;
};

export function useLikePost(
  postId: string, 
  initialLikes: number, 
  initialIsLiked: boolean = false
) {
  const [isPending, startTransition] = useTransition();

  const [optimisticState, setOptimisticState] = useOptimistic(
    { likeCount: initialLikes, isLiked: initialIsLiked },
    (current: LikeState) => ({
      likeCount: current.isLiked ? current.likeCount - 1 : current.likeCount + 1,
      isLiked: !current.isLiked,
    })
  );

  const toggleLike = () => {
    startTransition(async () => {
      // Instantly update local state before server responds
      setOptimisticState({
        likeCount: optimisticState.isLiked ? optimisticState.likeCount - 1 : optimisticState.likeCount + 1,
        isLiked: !optimisticState.isLiked,
      });

      const result = await toggleLikePost(postId);
      if (!result.success) {
        console.error("Failed to toggle like:", result.error);
      }
    });
  };

  return {
    likeCount: optimisticState.likeCount,
    isLiked: optimisticState.isLiked,
    isPending,
    toggleLike,
  };
}