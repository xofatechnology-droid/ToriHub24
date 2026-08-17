"use client";

import { useState, useTransition } from "react";
import { createPostAction } from "../actions/postActions"; // Your Server Action

export const useCreatePost = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submitPost = (formData: FormData) => {
    setError(null);
    
    startTransition(async () => {
      try {
        const result = await createPostAction(formData);
        
        if (result?.error) {
          setError(result.error);
        }
        // On success, Next.js revalidatePath in the action will automatically 
        // update the feed, so no extra client state management is needed!
      } catch (err) {
        setError("Failed to publish your post. Please try again.");
      }
    });
  };

  return { submitPost, isPending, error };
};