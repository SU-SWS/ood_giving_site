'use client';

import { liteClient } from 'algoliasearch/lite';
import { Hits } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { type SearchClient, type UiState } from 'instantsearch.js';
import { SearchHit } from './SearchHit';
import { SearchBox } from './SearchBox';
import { SearchResultsHeader } from './SearchResultsHeader';
import { useMemo } from 'react';
import { NoResultsBoundary } from './NoResultsBoundary';
import { SearchPagination } from './SearchPagination';

export type SearchProps = {
  emptySearchText?: string;
  emptySearchTitle?: string;
  suggestionsAmount?: string;
  noResultsErrorText?: string;
  noResultsErrorTitle?: string;
};

export const Search = ({
  emptySearchText = '',
  emptySearchTitle = '',
  suggestionsAmount = '8',
  noResultsErrorText = '',
  noResultsErrorTitle = '',
}: SearchProps) => {
  const numSuggestions = useMemo(() => parseInt(suggestionsAmount, 10) || 0, [suggestionsAmount]);
  const algoliaClient = liteClient(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  );

  const searchClient = {
    ...algoliaClient,

    search(requests: any[]) {
      if (requests.every(({ params }) => !params?.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [] as unknown[],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        });
      }

      return algoliaClient.search(requests);
    },
  };

  return (
    <InstantSearchNext
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      searchClient={searchClient as SearchClient}
      insights
      routing={{
        router: {
          cleanUrlOnDispose: false,
          writeDelay: 100,
        },
        stateMapping: {
          stateToRoute(uiState) {
            const indexUiState = uiState[process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME];
            return {
              q: indexUiState.query,
              page: indexUiState.page,
            } as UiState;
          },
          routeToState(routeState) {
            return {
              [process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME]: {
                query: routeState.q,
                page: routeState.page,
              },
            } as UiState;
          },
        },
      }}
    >
      <SearchBox
        emptySearchText={emptySearchText}
        emptySearchTitle={emptySearchTitle}
        numSuggestions={numSuggestions}
      />
      <SearchResultsHeader />
      <NoResultsBoundary noResultsErrorTitle={noResultsErrorTitle} noResultsErrorText={noResultsErrorText}>
        <Hits
          hitComponent={SearchHit}
          classNames={{
            root: 'rs-mt-2',
            list: 'list-none p-0',
            item: 'm-0',
          }}
        />
        <SearchPagination />
      </NoResultsBoundary>
    </InstantSearchNext>
  );
};
