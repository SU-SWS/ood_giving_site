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
  },
};

export default nextConfig;
