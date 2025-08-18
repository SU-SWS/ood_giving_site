import { apiPlugin, getStoryblokApi, storyblokInit } from '@storyblok/react/rsc';

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
});

/**
 * Check if the current environment is production.
 * @returns {boolean}
 */
const isProduction = () => {
  return process.env.CONTEXT === 'production';
};

/**
 * Sanitize the redirect code to ensure it is a valid HTTP status code.
 * @param {string} code
 * @returns {number}
 */
const sanitizeRedirectCode = (code) => {
  // Ensure code is a number and in one of 301, 302, 303, 307, 308
  const statusCode = parseInt(code, 10);
  if ([301, 302, 303, 307, 308].includes(statusCode)) {
    return statusCode;
  }
  return 301;
};

/**
 * Double-slash escape characters in a string.
 * @param {string} str
 * @returns {string}
 */
const sanitizeSourcePath = (str) => {
  const parts = str.split('?');
  const path = parts[0];
  // Replace '*' with '(.*)' to match dynamic routes
  return path.replace(/\*/g, '(.*)');
};

/**
 * Extract query parameters from a URL.
 * @param {string} url
 * @returns {Array<{type: 'query', key: string, value: string}>}
 */
const extractQueryParameters = (url) => {
  // Parse the URL and get the query string
  const urlObj = new URL(url, 'http://example.com'); // base URL needed for relative paths

  // Iterate through each query parameter and add it to the array in the required format
  return Array.from(urlObj.searchParams).map(([value, key]) => ({
    type: 'query',
    key: key,
    value: value,
  }));
};

/**
 * Get redirects from Storyblok.
 * @returns {Promise<Array>}
 */
export const getStoryblokRedirects = async () => {
  const storyblokApi = getStoryblokApi();
  const isProd = isProduction();
  const sbParams = {
    version: isProd ? 'published' : 'draft',
    resolve_links: '0',
    resolve_assets: 0,
    starts_with: '/global-components/redirects',
  };

  const stories = await storyblokApi.getAll(`cdn/stories`, sbParams);

  if (!stories?.length) {
    return [];
  }

  const redirects = stories
  .filter(entry => entry.content.from && entry.content.to) // Filter out entries without "from" or "to"
  .map(entry => ({
    source: sanitizeSourcePath(entry.content.from),
    has: extractQueryParameters(entry.content.from),
    destination: entry.content.to,
    statusCode: sanitizeRedirectCode(entry.content.statusCode),
  }));

  return redirects;
};
