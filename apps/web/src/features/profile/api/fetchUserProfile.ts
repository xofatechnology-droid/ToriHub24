"use server";

import { db } from "@torihub/db";
import { PLATFORM_LIMITS } from "@/lib/constants";

export async function fetchUserProfile(userId: string) {
  try {
    const userProfile = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        // Assume you added a bio string field to your Prisma User model
        // bio: true, 
        createdAt: true,
        _count: {
          select: { posts: true },
        },
        // Fetch their 5 most recent posts for the profile view
        posts: {
          take: 5,
          orderBy: { createdAt: "desc" },
          include: {
            _count: { select: { likes: true } },
          },
        },
      },
    });

    if (!userProfile) {
      return { success: false, error: "User not found." };
    }

    return { success: true, data: userProfile };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return { success: false, error: "Failed to load profile." };
  }
}