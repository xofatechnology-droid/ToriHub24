/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: This tells Next.js to compile your local monorepo packages
  transpilePackages: ["@torihub/ui", "@torihub/db", "@torihub/emails"],
};

module.exports = nextConfig;