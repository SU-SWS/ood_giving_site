import dotenv from 'dotenv';

dotenv.config();

/**
 * Legacy Netlify deploy hook retained for compatibility.
 * Index updates are now driven by Storyblok webhooks.
 */
const deploySucceeded = async () => {
  console.log('[Algolia] deploy-succeeded hook is a no-op; Storyblok webhooks now drive indexing.');

  // Default empty 200
  return new Response();
};

export default deploySucceeded;
