import Link from "next/link";
import { Button } from "@torihub/ui";
import { Home, Bell, User } from "lucide-react"; // lucide-react is installed in your UI package
import { ROUTES } from "@/lib/constants";

export function Navbar() {
  // TODO: Replace with actual auth state (e.g., from next-auth or your auth provider)
  const isAuthenticated = false; 

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <Link href={ROUTES.FEED} className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-90">
            ToriHub24
          </Link>
        </div>

        {/* Primary Social Navigation (Hidden on small screens) */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            <Link href={ROUTES.FEED} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              <Home className="h-4 w-4" />
              Feed
            </Link>
            <Link href="#" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              <Bell className="h-4 w-4" />
              Notifications
            </Link>
          </div>
        )}

        {/* User Actions / Auth */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link href={`/profile/me`} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              <User className="h-5 w-5 rounded-full bg-gray-100 p-0.5" />
              <span>Profile</span>
            </Link>
          ) : (
            <>
              <Link 
                href={ROUTES.LOGIN} 
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Log in
              </Link>
              <Button asChild>
                <Link href={ROUTES.REGISTER}>Sign up</Link>
              </Button>
            </>
          )}
        </div>
        
      </div>
    </nav>
  );
}