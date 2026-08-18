import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@torihub/ui/components/card";
import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "Log In | ToriHub24",
  description: "Log in to your ToriHub24 account",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
      <Card className="w-full max-w-md border-gray-100 shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your credentials to access your ToriHub24 account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          
          <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-100">
            Don&apos;t have an account?{" "}
            <Link 
              href={ROUTES.REGISTER} 
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}