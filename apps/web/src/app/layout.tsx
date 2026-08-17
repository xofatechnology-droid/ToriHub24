import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToriHub24",
  description: "The modern social community platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}