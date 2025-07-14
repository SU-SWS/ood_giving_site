export type SearchFormVariant = 'default' | 'modal';

export type SearchHit = {
  objectID: string;
  processed: {
    author?: string;
    description?: string;
    intro?: string;
    path?: string;
    shortText?: string;
    teaser?: string;
    text?: string;
    title?: string;
  };
};

export type SuggestionHit = {
  objectID: string;
  query: string;
};
