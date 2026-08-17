"use server";

import { db } from "@torihub/db";
import type { PostWithAuthor, PostActionResponse } from "../types";
import { PLATFORM_LIMITS } from "@/lib/constants";

export async function getPosts(): Promise<PostActionResponse<PostWithAuthor[]>> {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: PLATFORM_LIMITS.POSTS_PER_PAGE,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      error: "Failed to load community posts.",
    };
  }
}