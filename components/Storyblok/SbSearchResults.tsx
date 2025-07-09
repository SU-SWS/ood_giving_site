import { Search } from '@/components/Search';
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

export const SbSearchResults = (props: SbSearchResultsProps) => (
  <Search
    emptySearchText={props?.blok?.emptySearchText}
    emptySearchTitle={props?.blok?.emptySearchTitle}
    suggestionsAmount={props?.blok?.suggestionsAmount}
    noResultsErrorText={props?.blok?.noResultsErrorText}
    noResultsErrorTitle={props?.blok?.noResultsErrorTitle}
  />
);
