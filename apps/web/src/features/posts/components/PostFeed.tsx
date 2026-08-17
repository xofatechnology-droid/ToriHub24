// apps/web/src/features/posts/types.ts

// Maps to the exact shape returned by getPosts.ts
export type PostWithAuthor = {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
  };
  _count: {
    likes: number;
  };
};

// Standardized Server Action response for the feature
export type PostActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};