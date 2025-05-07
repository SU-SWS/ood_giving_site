// Resolved Netlify app url
let appUrl = 'http://localhost:3000';

if (process.env.CONTEXT === 'production') {
  // Support for Production app builds.
  appUrl = process.env.URL;
} else if (process.env.CONTEXT !== 'production' && process.env.NETLIFY) {
  // Support for non-production netlify builds (branch/preview)
  appUrl = process.env.DEPLOY_PRIME_URL;
} else if (process.env.NETLIFY_DEV) {
  // Support for Netlify CLI.
  appUrl = 'http://localhost:64946';
}

/**
 * Global variables for this project.
 */
export const config = {
  isNetlify: process.env.NETLIFY ?? false,
  basePath: `${appUrl}/`,
  siteTitle: 'Giving to Stanford',
  // TODO: default description?
  siteDescription: '',
  siteUrlProd: 'https://giving.stanford.edu',
  assetCdn: 'https://assets.stanford.edu/',
  imageService: 'https://a-us.storyblok.com/',
  breakpoints: {
    '2xs': 0,
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1500,
  },
};
