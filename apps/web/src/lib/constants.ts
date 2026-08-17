export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FEED: "/feed",
  PROFILE: (id: string) => `/profile/${id}`,
} as const;

export const PLATFORM_LIMITS = {
  MAX_POST_LENGTH: 280,
  MAX_BIO_LENGTH: 160,
  POSTS_PER_PAGE: 10,
} as const;