import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.stanford.edu',
      },
    ],
  },
  env: {
    DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
    STORYBLOK_PREVIEW_EDITOR_TOKEN: process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN,
    CONTEXT: process.env.CONTEXT || 'development',
    URL: process.env.URL || '',
    BUILD_ID: process.env.BUILD_ID || '',
  },
  /**
   * Next.js 16 Upgrade Note:
   * - Removed custom cacheHandler that bypassed 2MB limit.
   *   Next.js 16's new caching architecture should handle large payloads natively.
   * - Removed eslint config (Next.js 16 no longer supports it in next.config.ts).
   *   ESLint should be configured via eslint.config.mjs instead.
   * See ADR-00XX for details.
   */
};

export default nextConfig;
