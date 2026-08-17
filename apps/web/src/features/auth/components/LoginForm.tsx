"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/registerUser";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@torihub/ui/components/card";
import { Button } from "@torihub/ui/components/button";
import { Input } from "@torihub/ui/components/input";
import { Label } from "@torihub/ui/components/label";
import { ROUTES } from "@/lib/constants";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const result = await registerUser({ name, email, password });
      
      if (result.success) {
        router.push(ROUTES.FEED);
      } else {
        setError(result.error || "Failed to create account.");
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Join ToriHub24</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Alex" 
              required 
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="you@example.com" 
              required 
              disabled={isPending}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              disabled={isPending}
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 font-medium">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account? <a href={ROUTES.LOGIN} className="text-blue-500 hover:underline">Sign in</a>
        </p>
      </CardFooter>
    </Card>
  );
}