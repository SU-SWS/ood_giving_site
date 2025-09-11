import StoryblokClient from 'storyblok-js-client';
import dotenv from 'dotenv';

// Call defaults.
dotenv.config();

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
 * @param {*} str
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
 * @returns {Array}
 */
const extractQueryParameters = (url) => {
  // Parse the URL and get the query string
  const urlObj = new URL(url, 'http://example.com'); // base URL needed for relative paths
  const queryParams = new URLSearchParams(urlObj.search);

  // Create an array to hold the query parameter objects
  const queryArray = [];

  // Iterate through each query parameter and add it to the array in the required format
  queryParams.forEach((value, key) => {
      queryArray.push({
          type: 'query',
          key: key,
          value: value,
      });
  });

  return queryArray;
};

/**
 * Get redirects from Storyblok.
 * @returns {Promise<Array>}
 */
const getStoryblokRedirects = async (isProd, storyPath, apiKey, region) => {
  // Set up the Storyblok client
  let storyblokApi = new StoryblokClient({
    accessToken: apiKey,
    region: region || 'eu',
  });

  const sbParams = {
    version: isProd ? 'published' : 'draft',
    resolve_links: '0',
    resolve_assets: 0,
    per_page: 100,
    starts_with: storyPath || 'global-components/redirects',
  };

  const stories = await storyblokApi.getAll(`cdn/stories`, sbParams);

  if (!stories || stories.length === 0) {
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

/**
 * BUILD EVENTS
 * *************************************************************************
 *
 * onPostBuild
 */

export const onPostBuild = async ({ netlifyConfig, inputs, utils: { build, status } }) => {
  const { keyvar, region, storypath } = inputs;
  const environment = process.env.CONTEXT || 'production';
  const storyblokKey = process.env[keyvar] || process.env.STORYBLOK_ACCESS_TOKEN;

  status.show({
    title: 'Storyblok Redirects',
    summary: `Fetching redirects from Storyblok...`,
  });

  try {
    const redirects = await getStoryblokRedirects(environment === 'production', storypath, storyblokKey, region);

    // If no redirects are found, log a message and exit
    if (!redirects || redirects.length === 0) {
      status.show({
        title: 'Storyblok Redirects',
        summary: `No redirects found in Storyblok.`,
      });
      return;
    }
    // Log the redirects
    const count = redirects.length;
    status.show({
      title: 'Storyblok Redirects',
      summary: `Found ${count} redirects in Storyblok.`,
    });

    // Loop through the redirects and add them to the Netlify redirects
    redirects.forEach((redirect) => {
      const {
        source, has, destination, statusCode,
      } = redirect;

      // Make sure the redirects array exists
      netlifyConfig.redirects = netlifyConfig.redirects || [];

      // Add the redirect to the Netlify redirects
      netlifyConfig.redirects.push({
        from: source,
        to: destination,
        status: statusCode,
        force: true,
        conditions: has && has.length > 0 ? {
          query: has,
        } : undefined,
      });
    });

  }
  catch (error) {
    console.error('Error fetching redirects from Storyblok:', error);
    build.failBuild('Error fetching redirects from Storyblok', { error });
  }

  status.show({
    title: 'Storyblok Redirects',
    summary: `Storyblok Redirects added successfully.`,
  });
};
