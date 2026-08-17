"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@torihub/db";
import { ROUTES } from "@/lib/constants";

export async function likePost(postId: string) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_token")?.value;

    if (!userId) {
      return { success: false, error: "You must be logged in to like a post." };
    }

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
      // Unlike: Remove the record
      await db.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Like: Create the record
      await db.like.create({
        data: {
          postId,
          userId,
        },
      });
    }

    // Update the UI
    revalidatePath(ROUTES.FEED);
    return { success: true, action: existingLike ? "unliked" : "liked" };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to interact with post." };
  }
}