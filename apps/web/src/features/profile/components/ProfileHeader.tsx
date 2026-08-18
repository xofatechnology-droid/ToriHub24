"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@torihub/ui/components/Card";

type ProfileProps = {
  user: {
    name: string;
    bio?: string | null;
    _count: { posts: number };
  };
};

export function ProfileHeader({ user }: ProfileProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          {user.bio || "No bio yet."}
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span><strong>{user._count.posts}</strong> Posts</span>
        </div>
      </CardContent>
    </Card>
  );
}