import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 md:px-8">
        
        <div className="text-sm text-gray-500">
          © {currentYear} ToriHub24. All rights reserved.
        </div>
        
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-500">
          <Link href="/about" className="transition-colors hover:text-gray-900">
            About
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="/contact" className="transition-colors hover:text-gray-900">
            Contact
          </Link>
        </nav>

      </div>
    </footer>
  );
}