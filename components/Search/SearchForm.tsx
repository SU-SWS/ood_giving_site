'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEventHandler,
  type KeyboardEventHandler,
} from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from '@headlessui/react';
import { HeroIcon } from '@/components/HeroIcon';
import { liteClient } from 'algoliasearch/lite';
import { useDebounceValue } from 'usehooks-ts';
import { type SuggestionHit, type SearchFormVariant, SearchHit } from './Search.types';
import * as styles from './Search.styles';

export type SearchFormProps = {
  variant?: SearchFormVariant;
  defaultValue?: string;
  numSuggestions?: number;
  showEmptyError?: boolean;
  emptyErrorId?: string;
  onSubmit?: (selected: string) => void;
  onClear?: () => void;
  setShowEmptyError?: (e: boolean) => void;
};

export const SearchForm = ({
  variant = 'default',
  defaultValue = null,
  numSuggestions = 8,
  showEmptyError = false,
  emptyErrorId,
  onSubmit = () => null,
  onClear = () => null,
  setShowEmptyError = () => null,
}: SearchFormProps) => {
  const algoliaClient = liteClient(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  );

  const [options, setOptions] = useState<{ id: string, title: string }[]>([]);
  const [query, setQuery] = useState<string | null>(defaultValue);
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue<string | null>(null, 500);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    // Stop the form submit if the search input is empty
    if (!query) {
      setShowEmptyError(true);
      return;
    }

    onSubmit(query);
  }, [query, onSubmit, setShowEmptyError]);

  const handleReset = useCallback(() => {
    setQuery(null);
    if (inputRef?.current) {
      inputRef.current.focus();
    }
    onClear();
  }, [onClear]);

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === 'Enter') {
      setTimeout(() => formRef.current.requestSubmit());
    }
  }, []);

  const handleClick = useCallback(() => {
    setTimeout(() => formRef.current.requestSubmit());
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!query) {
        setOptions([]);
        return;
      }

      if (!debouncedQuery) {
        setOptions([]);
        return;
      }

      try {
        const res = await algoliaClient.searchForHits<SuggestionHit | SearchHit>({
          requests: [{
            indexName: process.env.NEXT_PUBLIC_ALGOLIA_SUGGESTIONS_INDEX_NAME,
            query: debouncedQuery,
            hitsPerPage: numSuggestions,
          }, {
            indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
            query: debouncedQuery,
            hitsPerPage: numSuggestions,
          }],
        });

        const maxSuggestions = Math.floor(numSuggestions / 2);

        const newSuggestions = (res?.results?.[0]?.hits as SuggestionHit[])?.map((hit) => ({
          id: hit.objectID,
          title: hit.query,
        }))?.slice(0, maxSuggestions) ?? [];

        const newHits = (res?.results?.[1]?.hits as SearchHit[])?.map((hit) => ({
          id: hit.objectID,
          title: hit.processed.title,
        }))?.slice(0, numSuggestions - newSuggestions.length) ?? [];

        const newOptions = [
          ...newSuggestions,
          ...newHits,
        ];

        if (!newOptions?.length && !options?.length) {
          return;
        }

        setOptions(newOptions);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        setOptions([]);
      }
    };

    fetchOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, debouncedQuery]);

  useEffect(() => {
    // Set debounced query when query changes
    setDebouncedQuery(query);

    // Reset empty message if query changes and has a value
    if (query && showEmptyError) {
      setShowEmptyError(false);
    }

    if (!query) {
      onClear();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <form
      action="/search-results"
      role="search"
      onSubmit={handleFormSubmit}
      onReset={handleReset}
      ref={formRef}
    >
      <Field className="relative flex items-start gap-16 w-full">
        <Label className="sr-only">Search Giving to Stanford</Label>
        <Combobox
          as="div"
          value={query}
          onChange={(option) => setQuery(option || null)}
          className="relative w-full"
        >
          {({ activeOption }) => (
            <>
              <ComboboxInput
                name="q"
                placeholder="Search"
                className={styles.searchFormInput({ variant })}
                onChange={(e) => setQuery(e.currentTarget.value)}
                displayValue={() => activeOption || query || ''}
                onKeyDown={handleEnter}
                aria-describedby={showEmptyError && emptyErrorId ? emptyErrorId : undefined}
                aria-required
                autoFocus
                ref={inputRef}
              />
              <ComboboxOptions as="ul" portal={false} className={styles.searchFormOptions({ variant })}>
                {!!query && (
                  <ComboboxOption
                    as="li"
                    onMouseDown={handleClick}
                    value={query}
                    className={styles.searchFormOption({ variant })}
                  >
                    Custom: &ldquo;{query}&rdquo;
                  </ComboboxOption>
                )}
                {options.map((option) => (
                  <ComboboxOption
                    as="li"
                    key={option.id}
                    value={option.title}
                    className={styles.searchFormOption({ variant })}
                    onMouseDown={handleClick}
                  >
                    {option.title}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </>
          )}
        </Combobox>
        {!!query && (
          <button type="reset" className={styles.searchFormResetButton({ variant })}>
            Clear <HeroIcon aria-hidden icon="close" />
          </button>
        )}
        <button type="submit" className={styles.searchFormSubmitButton({ variant })}>
          <HeroIcon icon="search" title="Search" className={styles.searchFormSubmitButtonIcon({ variant })} />
        </button>
      </Field>
    </form>
  );
};
