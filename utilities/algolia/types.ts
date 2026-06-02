import { type ISbStoryData } from '@storyblok/react/rsc';

/**
 * Flattened content fields consumed by search result rendering components.
 */
export type AlgoliaProcessedRecord = {
  author?: string;
  description?: string;
  intro?: string;
  path: string;
  shortText?: string;
  teaser?: string;
  text?: string;
  title: string;
};

/**
 * Primary Algolia search record shape used by the main index.
 */
export type AlgoliaSearchRecord = ISbStoryData & {
  objectID: string;
  processed: AlgoliaProcessedRecord;
};

/**
 * Minimal record shape for Algolia query suggestions.
 */
export type AlgoliaSuggestionRecord = {
  objectID: string;
  query: string;
};

/**
 * Storyblok webhook actions that trigger index mutations.
 */
export type StoryblokWebhookAction =
  | 'story.deleted'
  | 'story.moved'
  | 'story.published'
  | 'story.unpublished';

/**
 * Input envelope for index processing from webhook events.
 */
export type IndexStoryParams = {
  action: StoryblokWebhookAction;
  fullSlug?: string | null;
  oldFullSlug?: string | null;
};
