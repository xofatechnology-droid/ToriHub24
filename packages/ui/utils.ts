// packages/ui/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Safely merges Tailwind classes without style conflicts.
 * Example: cn("px-2 py-1 bg-red-500", "bg-blue-500") -> "px-2 py-1 bg-blue-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}