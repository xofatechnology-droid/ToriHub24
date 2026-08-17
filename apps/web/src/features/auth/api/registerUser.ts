"use server";

import { cookies } from "next/headers";
import { db } from "@torihub/db";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(input: RegisterInput) {
  try {
    const { name, email, password } = input;

    if (!email || !password || !name) {
      return { success: false, error: "All fields are required." };
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    // Create new user (In production, hash the password with bcrypt/argon2 before saving)
    const user = await db.user.create({
      data: {
        name,
        email,
        // password: await hashPassword(password),
      },
    });

    // Establish session cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Register Error:", error);
    return { success: false, error: "Failed to create account. Try again later." };
  }
}