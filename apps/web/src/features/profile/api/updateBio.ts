"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@torihub/db";
import { ROUTES, PLATFORM_LIMITS } from "@/lib/constants";

export async function updateBio(bio: string) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_token")?.value;

    if (!userId) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    if (bio.length > PLATFORM_LIMITS.MAX_BIO_LENGTH) {
      return { 
        success: false, 
        error: `Bio cannot exceed ${PLATFORM_LIMITS.MAX_BIO_LENGTH} characters.` 
      };
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        // Uncomment once `bio` is added to your Prisma schema
        // bio: bio.trim(),
      },
    });

    // Invalidate the profile route so the changes are instantly visible
    // Note: Assuming ROUTES.PROFILE is a function like (id) => `/profile/${id}`
    revalidatePath(ROUTES.PROFILE(userId));

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Failed to update bio:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}