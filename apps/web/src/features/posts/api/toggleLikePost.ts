"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { db } from "@torihub/db";
import { ROUTES } from "@/lib/constants";
import type { PostActionResponse } from "../types";

export async function toggleLikePost(postId: string): Promise<PostActionResponse> {
  try {
    // In a real app, you'd decode the JWT or session token here
    const sessionToken = cookies().get("session_token")?.value;
    
    if (!sessionToken) {
      return { success: false, error: "Unauthorized" };
    }

    // Mock resolving user ID from token for demonstration
    const userId = sessionToken; 

    // Check if the like already exists
    const existingLike = await db.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await db.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Like
      await db.like.create({
        data: {
          postId,
          userId,
        },
      });
    }

    // Revalidate the feed to ensure fresh data on next load
    revalidatePath(ROUTES.FEED);

    return { success: true };
  } catch (error) {
    console.error("Error toggling like:", error);
    return { success: false, error: "Failed to update like status." };
  }
}