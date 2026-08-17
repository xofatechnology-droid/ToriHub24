"use server";

import { revalidatePath } from "next/cache";
import { db } from "@torihub/db";

export async function createPostAction(formData: FormData) {
  try {
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;

    if (!content || content.trim() === "") {
      return { success: false, error: "Post content cannot be empty." };
    }

    const post = await db.post.create({
      data: {
        content,
        authorId: authorId || "system-user",
      },
      include: {
        author: true,
      },
    });

    revalidatePath("/feed");
    return { success: true, data: post };
  } catch (err) {
    return { success: false, error: "Failed to create post." };
  }
}

export async function deletePostAction(postId: string) {
  try {
    await db.post.delete({
      where: { id: postId },
    });

    revalidatePath("/feed");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete post." };
  }
}