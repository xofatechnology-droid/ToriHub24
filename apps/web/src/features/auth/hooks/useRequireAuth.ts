"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./useSession";
import { ROUTES } from "@/lib/constants";

export function useRequireAuth() {
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the check is finished and no user exists, boot them to login
    if (!isLoading && !user) {
      router.push(ROUTES.LOGIN);
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
}