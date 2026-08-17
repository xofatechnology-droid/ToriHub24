// apps/web/src/lib/constants.ts

export const SITE_CONFIG = {
  name: "ToriHub24",
  description: "The modern social community platform.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const PLATFORM_LIMITS = {
  MAX_POST_LENGTH: 280,
  MAX_BIO_LENGTH: 160,
  MAX_IMAGE_UPLOAD_SIZE_MB: 5,
  POSTS_PER_PAGE: 20,
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FEED: "/feed",
  PROFILE: (username: string) => `/${username}`,
  SETTINGS: "/settings",
};