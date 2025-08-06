'use client';

import { useCallback, useState } from 'react';
import { useSearchBox } from 'react-instantsearch';
import { Heading, Paragraph } from '@/components/Typography';
import { SearchForm } from './SearchForm';

export type SearchBoxProps = {
  emptySearchText?: string;
  emptySearchTitle?: string;
  numSuggestions?: number;
};

export const SearchBox = ({
  emptySearchText,
  emptySearchTitle,
  numSuggestions,
}: SearchBoxProps) => {
  const [showEmptyError, setShowEmptyError] = useState(false);
  const { refine, query } = useSearchBox();

  const handleSubmit = useCallback((submitted: string) => {
    refine(submitted);
  }, [refine]);

  const handleClear = useCallback(() => {
    refine('');
  }, [refine]);

  return (
    <>
      <div className="rs-mb-4">
        <SearchForm
          defaultValue={query || undefined}
          onSubmit={handleSubmit}
          onClear={handleClear}
          numSuggestions={numSuggestions}
          showEmptyError={showEmptyError}
          setShowEmptyError={setShowEmptyError}
          emptyErrorId="search-field-empty-title search-field-empty-message"
        />
      </div>
      {showEmptyError && (
        <>
          <Heading as="h2" size="f2" id="search-field-empty-title">
            {emptySearchTitle}
          </Heading>
          <Paragraph id="search-field-empty-message" size="f0">
            {emptySearchText}
          </Paragraph>
        </>
      )}
    </>
  );
};
