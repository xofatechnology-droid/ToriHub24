"use client";

import { useState, useTransition } from "react";
import { updateBio } from "../api/updateBio";

export function useProfile() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const editBio = (newBio: string, onSuccess?: () => void) => {
    setError(null);
    
    startTransition(async () => {
      const result = await updateBio(newBio);
      
      if (result.success) {
        // Trigger any success callbacks (like closing a modal)
        onSuccess?.();
      } else {
        setError(result.error || "Failed to update profile.");
      }
    });
  };

  return { 
    editBio, 
    isPending, 
    error 
  };
}