import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Dev-only. Static export ignores rewrites, and the browser calls the app host directly.
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return [
            {
              source: "/api/events/:path*",
              destination: "https://app.chicagominamidojo.com/api/events/:path*",
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
