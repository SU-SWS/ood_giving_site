import { type ISbStoryData } from '@storyblok/react/rsc';
import { sbStripSlugURL } from '@/utilities/sbStripSlugUrl';
import { type AlgoliaProcessedRecord, type AlgoliaSearchRecord } from './types';

const CONTENT_KEYS = ['storyContent', 'pageContent', 'aboveContent', 'belowContent', 'sections'];
const TEXT_KEYS = ['text', 'headline'];
const EXCLUDED_PREFIXES = ['admin/', 'archived/', 'global-components/', 'test/', 'test-items/'];
const EXCLUDED_EXACT = ['403-access-denied', '404-page-not-found', 'search-results', '404', '403'];
const EXCLUDED_COMPONENTS = ['Redirect'];
/** Normalizes whitespace and trims user-facing text values. */
const cleanText = (value?: string): string => (value || '').replace(/\s+/g, ' ').trim();

/**
 * Narrowing helper for plain object traversal.
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Recursively collects values for target keys anywhere in a nested structure.
 */
const deepSearchByKeys = (input: unknown, keys: string[], acc: unknown[] = []): unknown[] => {
  if (Array.isArray(input)) {
    input.forEach((item) => deepSearchByKeys(item, keys, acc));
    return acc;
  }

  if (!isPlainObject(input)) {
    return acc;
  }

  Object.entries(input).forEach(([key, value]) => {
    if (keys.includes(key)) {
      acc.push(value);
    }

    deepSearchByKeys(value, keys, acc);
  });

  return acc;
};

/**
 * Recursively extracts all string content from nested Storyblok JSON.
 */
const extractText = (value: unknown, acc: string[] = []): string[] => {
  if (typeof value === 'string') {
    const normalized = cleanText(value);
    if (normalized) {
      acc.push(normalized);
    }

    return acc;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => extractText(item, acc));
    return acc;
  }

  if (!isPlainObject(value)) {
    return acc;
  }

  Object.entries(value).forEach(([key, item]) => {
    extractText(item, acc);
  });

  return acc;
};

/** Joins extracted text segments into a single search field, removing duplicates. */
const joinTextSegments = (segments: string[]): string => {
  if (!segments.length) {
    return '';
  }

  const seen = new Set<string>();
  const collected: string[] = [];

  for (const segment of segments) {
    const normalized = cleanText(segment);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      collected.push(normalized);
    }
  }

  return collected.join(' ');
};

/**
 * Returns true when a slug should not be indexed in Algolia.
 */
export const isFilteredSlug = (fullSlug?: string): boolean => {
  const slug = cleanText(fullSlug || '');
  if (!slug) {
    return true;
  }

  if (EXCLUDED_EXACT.includes(slug)) {
    return true;
  }

  return EXCLUDED_PREFIXES.some((prefix) => slug.startsWith(prefix));
};

/**
 * Converts a Storyblok story into the flattened Algolia search schema.
 * Returns undefined when the story should be excluded from indexing.
 */
export const transformStoryblokRecord = (record: ISbStoryData): AlgoliaSearchRecord | undefined => {
  const slug = cleanText(record?.full_slug || '');
  if (!slug || isFilteredSlug(slug)) {
    return undefined;
  }

  const content = isPlainObject(record?.content) ? record.content : {};

  if (EXCLUDED_COMPONENTS.includes(content?.component as string)) {
    return undefined;
  }

  const contentTextValues = deepSearchByKeys(content, CONTENT_KEYS)
    .flatMap((section) => extractText(section));

  const directTextValues = deepSearchByKeys(content, TEXT_KEYS)
    .flatMap((segment) => extractText(segment));

  const title = cleanText(
    (content?.seo_title as string)
    || (content?.title as string)
    || (content?.headline as string)
    || record.name,
  );

  const description = cleanText((content?.description as string) || (content?.metaDescription as string));
  const intro = cleanText(content?.intro as string);
  const teaser = cleanText(content?.teaser as string);
  const shortText = cleanText(content?.shortText as string);
  const author = cleanText((content?.author as string) || (content?.byline as string));
  const text = joinTextSegments([...directTextValues, ...contentTextValues]);

  const processed: AlgoliaProcessedRecord = {
    path: sbStripSlugURL(slug),
    title: title || slug,
  };

  if (author) {
    processed.author = author;
  }

  if (description) {
    processed.description = description;
  }

  if (intro) {
    processed.intro = intro;
  }

  if (shortText) {
    processed.shortText = shortText;
  }

  if (teaser) {
    processed.teaser = teaser;
  }

  if (text) {
    processed.text = text;
  }

  return {
    ...record,
    objectID: String(record.id),
    processed,
  };
};
