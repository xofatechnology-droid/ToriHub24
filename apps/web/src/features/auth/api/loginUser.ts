"use server";

import { cookies } from "next/headers";
import { db } from "@torihub/db";

type LoginInput = {
  email: string;
  password: string;
};

export async function loginUser(input: LoginInput) {
  try {
    const { email, password } = input;

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    // Verify user exists and compare passwords
    if (!user /* || !(await verifyPassword(password, user.password)) */) {
      return { success: false, error: "Invalid email or password." };
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Authentication failed. Please try again." };
  }
}