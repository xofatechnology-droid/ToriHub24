import type { PostWithAuthor } from "@/features/posts/types";

export type UserProfile = {
  id: string;
  name: string;
  bio?: string | null;
  createdAt: Date;
  _count: {
    posts: number;
  };
  posts: PostWithAuthor[];
};