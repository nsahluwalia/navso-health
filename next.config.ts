import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable App Router (default in Next.js 15)
  experimental: {
    typedRoutes: true,
  },

  // Image optimization for medical images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uvzenlpjrnqrmmvgqezz.supabase.co',
        pathname: '/storage/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
    ],
  },

  // API Rewrites to backend
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:5000/api/v1/:path*',
      },
    ];
  },

  // Security headers (HIPAA/DPDP compliance)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default nextConfig;
