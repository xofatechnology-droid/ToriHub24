"use client";

import { useState, useEffect } from "react";
import { getSession } from "../api/getSession";

type User = {
  id: string;
  name: string;
  email: string;
};

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchSession() {
      const { user } = await getSession();
      if (isMounted) {
        setUser(user as User | null);
        setIsLoading(false);
      }
    }

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, isLoading };
}