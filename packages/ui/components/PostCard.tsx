"use client";

import React, { useState } from "react";
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardFooter } from "./Card";

export interface PostAuthor {
  id: string;
  name: string;
  username?: string;
  image?: string | null;
}

export interface Post {
  id: string;
  content: string;
  createdAt: string | Date;
  author: PostAuthor;
  likesCount?: number;
  commentsCount?: number;
  hasLiked?: boolean;
  hasBookmarked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [liked, setLiked] = useState(post.hasLiked ?? false);
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
  const [bookmarked, setBookmarked] = useState(post.hasBookmarked ?? false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    if (onLike) onLike(post.id);
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const authorInitials = post.author.name
    ? post.author.name.substring(0, 2).toUpperCase()
    : "TH";

  return (
    <Card className="shadow-sm border border-gray-100 hover:border-gray-200 transition-all bg-white dark:bg-gray-900 dark:border-gray-800">
      <CardContent className="pt-5 pb-3">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {post.author.image ? (
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#033832] text-white flex items-center justify-center font-bold text-sm">
                {authorInitials}
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                {post.author.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {post.author.username ? `@${post.author.username} • ` : ""}
                {formattedDate}
              </p>
            </div>
          </div>

          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Post Content */}
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </CardContent>

      {/* Action Footer */}
      <CardFooter className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3 pb-3 px-6 text-gray-500 dark:text-gray-400 text-sm">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-colors hover:text-red-500 ${
            liked ? "text-red-500 font-medium" : ""
          }`}
        >
          <Heart size={18} className={liked ? "fill-red-500 text-red-500" : ""} />
          <span>{likesCount}</span>
        </button>

        <button
          onClick={() => onComment && onComment(post.id)}
          className="flex items-center gap-1.5 hover:text-[#E86C25] transition-colors"
        >
          <MessageSquare size={18} />
          <span>{post.commentsCount ?? 0}</span>
        </button>

        <button
          onClick={() => onShare && onShare(post.id)}
          className="flex items-center gap-1.5 hover:text-[#033832] dark:hover:text-emerald-400 transition-colors"
        >
          <Share2 size={18} />
        </button>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`hover:text-[#E86C25] transition-colors ${
            bookmarked ? "text-[#E86C25]" : ""
          }`}
        >
          <Bookmark size={18} className={bookmarked ? "fill-[#E86C25]" : ""} />
        </button>
      </CardFooter>
    </Card>
  );
}