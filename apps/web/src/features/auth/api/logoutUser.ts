"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session_token");
    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error);
    return { success: false, error: "Failed to log out." };
  }
}