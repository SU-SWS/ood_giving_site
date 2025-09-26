import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components', 'contexts', 'hooks', 'pages', 'services', 'utilities'],
  },
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
    CONTEXT: process.env.CONTEXT || 'development',
    STORYBLOK_PREVIEW_EDITOR_TOKEN: process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN,
    URL: process.env.URL || '',
    BUILD_ID: process.env.BUILD_ID || '',
  },
  /**
   * Hack to get over the 2MB limit on cacheHandler
   * This just reimports the default one but it skips the limit
   * See: https://github.com/vercel/next.js/discussions/48324#discussioncomment-10542097
   */
  cacheHandler: require.resolve('next/dist/server/lib/incremental-cache/file-system-cache.js'),
};

export default nextConfig;
