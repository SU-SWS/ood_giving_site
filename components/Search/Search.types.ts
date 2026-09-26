import { type AlgoliaProcessedRecord } from '@/utilities/algolia/types';

export type SearchFormVariant = 'default' | 'modal';

export type SearchHit = {
  objectID: string;
  processed: AlgoliaProcessedRecord;
};

export type SuggestionHit = {
  objectID: string;
  query: string;
};
