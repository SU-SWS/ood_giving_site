import { getAllStories } from '@/utilities/data/';
import { isProduction } from '@/utilities/getActiveEnv';
import { unstable_cache } from 'next/cache';

/**
 * Get the array of all valid slug paths for runtime validation
 * Uses the same logic as generateStaticParams to ensure consistency
 */
const getValidSlugs = async (): Promise<string[]> => {
  const isProd = isProduction();

  // Get all the stories.
  let stories = await getAllStories();

  // Filter out folders.
  stories = stories.filter((link) => link.is_folder === false);
  // Filter out test content by filtering out the `test` folder.
  if (isProd) {
    stories = stories.filter((link) => !link.slug.startsWith('test'));
  }
  // Filter out globals by filtering out the `global-components` folder.
  stories = stories.filter((link) => !link.slug.startsWith('global-components'));

  const validSlugs: string[] = [];

  stories.forEach((story) => {
    const slug = story.slug;
    const splitSlug = slug.split('/');

    // Remove any empty strings - same logic as generateStaticParams
    const cleanSlug = splitSlug.filter((s: string) => s.length);

    if (cleanSlug.length === 1 && cleanSlug[0] === 'home') {
      // Add empty string for the home page (matches generateStaticParams logic)
      validSlugs.push('');
    } else {
      // Join the clean slug array back to a path
      validSlugs.push(cleanSlug.join('/'));
    }
  });

  return validSlugs;
};

const BUILD_ID = process.env.BUILD_ID || '';

/**
 * Cached version of getValidSlugs to avoid repeated API calls
 */
const getValidSlugsCached = unstable_cache(
  getValidSlugs,
  ['valid-slugs', BUILD_ID], // Use a descriptive cache key to avoid conflicts
  {
    tags: ['story', 'all', 'slugs'],
    // Cache for 10 minutes to balance performance with content updates
    revalidate: 600,
  },
);

/**
 * Validate if a slug path exists in our known set of paths
 * without making a request to Storyblok's API
 *
 * @param slugArray - Array of slug segments from the URL
 * @returns Promise<boolean> - True if the path is valid, false otherwise
 */
export const validateSlugPath = async (slugArray: string[]): Promise<boolean> => {
  const validSlugs = await getValidSlugsCached();

  // Convert slug array to path string
  const slugPath = slugArray.length === 0 ? '' : slugArray.join('/');

  // Check if this exact path exists in our valid slugs
  return validSlugs.includes(slugPath);
};

/**
 * Convert slug array to the path format expected by Storyblok
 *
 * @param slugArray - Array of slug segments from the URL
 * @returns string - Path string for Storyblok API calls
 */
export const slugArrayToPath = (slugArray: string[]): string => {
  // Empty array or undefined means home page
  return slugArray && slugArray.length > 0 ? slugArray.join('/') : 'home';
};
