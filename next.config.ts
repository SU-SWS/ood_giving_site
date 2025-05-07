import type { NextConfig } from 'next';
import { getStoryblokRedirects } from '@/utilities/data/getStoryblokRedirects';

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
  },
  async redirects() {
    const storyblokRedirects = await getStoryblokRedirects();
    return [
      ...storyblokRedirects,
    ];
  },
};

export default nextConfig;
