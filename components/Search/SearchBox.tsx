'use client';

import { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q');
  const [showEmptyError, setShowEmptyError] = useState(false);
  const { refine } = useSearchBox();
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
          defaultValue={searchTerm || undefined}
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
