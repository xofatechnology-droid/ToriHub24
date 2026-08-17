"use server";

import { db } from "@torihub/db";
import { PLATFORM_LIMITS } from "@/lib/constants";

export async function getPosts() {
  try {
    const posts = await db.post.findMany({
      take: PLATFORM_LIMITS.POSTS_PER_PAGE,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });
    
    return { success: true, data: posts };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { success: false, error: "Failed to load the feed." };
  }
}