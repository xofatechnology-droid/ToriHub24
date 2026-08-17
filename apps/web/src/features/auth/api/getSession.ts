"use server";

import { cookies } from "next/headers";
import { db } from "@torihub/db";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) return { user: null };

    // Fetch user (excluding the password)
    const user = await db.user.findUnique({
      where: { id: token },
      select: { id: true, name: true, email: true },
    });

    return { user };
  } catch (error) {
    console.error("Session Error:", error);
    return { user: null };
  }
}