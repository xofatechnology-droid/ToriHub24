// apps/web/src/features/posts/types.ts

/**
 * Represents the author of a post. 
 * Picked from the Prisma User model to only include public-facing fields.
 */
export type PostAuthor = {
  id: string;
  name: string;
  // image?: string; // Uncomment when you add user avatars
};

/**
 * The core Post object as returned by the feed query, 
 * including relation data (author details and aggregate counts).
 */
export type PostWithAuthor = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: PostAuthor;
  _count: {
    likes: number;
    // comments: number; // Easy to add later when you build the comments feature
  };
};

/**
 * Standardized return type for Next.js Server Actions within the posts feature.
 * Makes error handling predictable across all client hooks.
 */
export type PostActionResponse<T = void> = 
  | { success: true; data?: T; action?: string }
  | { success: false; error: string };

/**
 * Validation schema type for creating a new post.
 */
export type CreatePostInput = {
  content: string;
};