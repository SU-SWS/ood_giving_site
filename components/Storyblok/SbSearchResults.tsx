import { Search } from '@/components/Search';
import { storyblokEditable } from '@storyblok/react/rsc';
import { type SbBlokData } from '@storyblok/react/rsc';

export type SbSearchResultsProps = {
  blok: SbBlokData & {
    emptySearchText?: string;
    emptySearchTitle?: string;
    suggestionsAmount?: string;
    noResultsErrorText?: string;
    noResultsErrorTitle?: string;
  },
};

export const SbSearchResults = ({ blok }: SbSearchResultsProps) => (
  <Search
    {...storyblokEditable(blok)}
    emptySearchText={blok?.emptySearchText}
    emptySearchTitle={blok?.emptySearchTitle}
    suggestionsAmount={blok?.suggestionsAmount}
    noResultsErrorText={blok?.noResultsErrorText}
    noResultsErrorTitle={blok?.noResultsErrorTitle}
  />
);
