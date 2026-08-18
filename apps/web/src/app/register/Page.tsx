import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@torihub/ui/components/card";
import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "Create an Account | ToriHub24",
  description: "Join the ToriHub24 community today",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
      <Card className="w-full max-w-md border-gray-100 shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your details below to join the community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm />
          
          <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-100">
            Already have an account?{" "}
            <Link 
              href={ROUTES.LOGIN} 
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}