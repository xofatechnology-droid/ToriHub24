"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@torihub/db";
import { ROUTES, PLATFORM_LIMITS } from "@/lib/constants";

export async function createPost(content: string) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_token")?.value;

    if (!userId) {
      return { success: false, error: "You must be logged in to post." };
    }

    if (!content || content.trim().length === 0) {
      return { success: false, error: "Post cannot be empty." };
    }

    if (content.length > PLATFORM_LIMITS.MAX_POST_LENGTH) {
      return { success: false, error: `Post exceeds the ${PLATFORM_LIMITS.MAX_POST_LENGTH} character limit.` };
    }

    const post = await db.post.create({
      data: {
        content: content.trim(),
        authorId: userId,
      },
    });

    // Instantly purge the Next.js cache for the feed page so the new post appears
    revalidatePath(ROUTES.FEED);

    return { success: true, data: post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}