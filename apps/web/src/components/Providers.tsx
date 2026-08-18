"use client";

import * as React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  /* 
   * NOTE: As you add global client state to ToriHub24, wrap them around {children} here.
   * 
   * Examples of what usually goes here in a social app:
   * 1. <SessionProvider> from NextAuth.js
   * 2. <ThemeProvider> from next-themes (for dark mode)
   * 3. <QueryClientProvider> from @tanstack/react-query
   */

  return (
    <>
      {children}
    </>
  );
}