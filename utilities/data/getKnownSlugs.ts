import { unstable_cache } from 'next/cache';
import { getAllStoriesForBuild, getAllStoriesCached } from './getAllStories';

/**
 * Get a Set of all known slugs for 404 pre-validation.
 * Uses build-time data during builds, cached data during runtime.
 */
export const getKnownSlugs = async (forBuild = false): Promise<Set<string>> => {
  const getAllStoriesFunc = forBuild ? getAllStoriesForBuild : getAllStoriesCached;

  try {
    let stories = await getAllStoriesFunc();

    // Filter out folders and test content
    stories = stories.filter((link) => {
      return link.is_folder === false &&
        !link.slug.startsWith('test') &&
        !link.slug.startsWith('global-components');
    });

    const slugs = new Set<string>();

    stories.forEach((story) => {
      const slug = story.slug;
      const splitSlug = slug.split('/');
      const cleanSlug = splitSlug.filter((s: string) => s.length);

      if (cleanSlug.length === 1 && cleanSlug[0] === 'home') {
        slugs.add(''); // Empty string for home
        slugs.add('home'); // Also add 'home' for safety
      } else {
        slugs.add(cleanSlug.join('/'));
      }
    });

    return slugs;
  } catch (error) {
    console.error('Failed to get known slugs:', error);
    // Return minimal set to prevent total failure
    return new Set(['', 'home']);
  }
};

/**
 * Cached version of getKnownSlugs for runtime use.
 */
export const getKnownSlugsCached = unstable_cache(
  () => getKnownSlugs(false),
  ['known-slugs'],
  {
    tags: ['story', 'slugs'],
    revalidate: 604800, // 7 days for edge caching
  },
);