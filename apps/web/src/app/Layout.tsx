import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers, Navbar, Sidebar, Footer } from "@/components";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToriHub24 - Social Community Platform",
  description: "Connect, share, and engage with your online community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Added `flex flex-col` so the layout takes full height and the footer sticks to the bottom */}
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          
          {/* Main layout grid */}
          <div className="flex flex-1 container mx-auto">
            <Sidebar />
            
            {/* The main content area */}
            <main className="flex-1 w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
              {children}
            </main>
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}