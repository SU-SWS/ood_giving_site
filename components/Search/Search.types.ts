export type SearchFormVariant = 'default' | 'modal';

export type SearchHit = {
  objectID: string;
  content: {
    title?: string;
    seo: {
      description?: string;
    }
  };
  full_slug?: string;
};

export type SuggestionHit = {
  objectID: string;
  query: string;
};
