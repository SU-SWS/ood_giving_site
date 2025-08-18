import { type MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  const CurrentURL = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://giving.stanford.edu';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/global-components/', '/test/', '/test-items/'],
    },
    sitemap: CurrentURL + '/sitemap.xml',
  };
};

export default robots;
