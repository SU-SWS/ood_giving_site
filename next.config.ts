import type { NextConfig } from 'next';
import { getStoryblokRedirects } from '@/utilities/data/getStoryblokRedirects.mjs';

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
  },
  async redirects() {
    return await getStoryblokRedirects();
  },
};

export default nextConfig;
