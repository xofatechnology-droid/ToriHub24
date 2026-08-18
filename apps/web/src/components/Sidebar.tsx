"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Bell, Mail, User, Settings } from "lucide-react";
import { ROUTES } from "@/lib/constants";

// Define the navigation items
const navItems = [
  { name: "Home", href: ROUTES.FEED, icon: Home },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Profile", href: "/profile/me", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white px-4 py-6 md:flex h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Check if the current route matches the link
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-gray-900" : "text-gray-500"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Optional: Add a bottom section for user actions or branding */}
      <div className="mt-auto border-t border-gray-100 pt-4">
        <p className="px-3 text-xs text-gray-400">© 2026 ToriHub24</p>
      </div>
    </aside>
  );
}