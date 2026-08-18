import Link from "next/link";
import { Button } from "@torihub/ui";
import { ROUTES } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <Link href={ROUTES.FEED} className="text-xl font-bold tracking-tight text-gray-900">
            ToriHub24
          </Link>
        </div>

        {/* Navigation / User Actions */}
        <nav className="flex items-center gap-4">
          <Link 
            href={ROUTES.LOGIN} 
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Log in
          </Link>
          <Button asChild>
            <Link href={ROUTES.REGISTER}>Sign up</Link>
          </Button>
        </nav>
        
      </div>
    </header>
  );
}