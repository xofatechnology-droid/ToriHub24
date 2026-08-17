"use client";

import { useState, useTransition } from "react";
import { toggleLikeAction } from "../actions/postActions"; 

export const useLikePost = (postId: string, initialIsLiked: boolean, initialLikeCount: number) => {
  const [isPending, startTransition] = useTransition();
  
  // Local state for optimistic updates
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const toggleLike = () => {
    // 1. Instantly update the UI (Optimistic update)
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;
    
    setIsLiked(!previousIsLiked);
    setLikeCount(previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1);

    // 2. Perform the server mutation in the background
    startTransition(async () => {
      const result = await toggleLikeAction(postId);
      
      // 3. Roll back the UI if the server action fails
      if (result?.error) {
        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);
        // Optional: Trigger a toast notification here about the error
      }
    });
  };

  return { isLiked, likeCount, toggleLike, isPending };
};