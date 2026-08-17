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