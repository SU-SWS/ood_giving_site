'use client';
import {
  type FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { liteClient } from 'algoliasearch/lite';
import { SearchModalContext } from './SearchModalContext';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from '@headlessui/react';
import { Paragraph } from '@/components/Typography';
import { useDebounceValue } from 'usehooks-ts';
import { HeroIcon } from '@/components/HeroIcon';
import { cnb } from 'cnbuilder';
import { useRouter } from 'next/navigation';

type HitAttributes = {
  content: {
    title: string;
    description: string;
  }
  full_slug: string;
  slug: string;
}

export const SearchForm = () => {
  const router = useRouter();
  const algoliaClient = liteClient(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  );

  const [options, setOptions] = useState<{ id: string, title: string }[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ id: string, title: string }>(null);
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue<string | null>(null, 500);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const { searchConfig, close } = useContext(SearchModalContext);
  const { emptySearchMessage } = searchConfig;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    // Stop the form submit if the search input is empty
    if (!selected && !query) {
      setShowEmptyMessage(true);
      return;
    }

    router.push(`/search?q=${selected.title || query}`);
    close();
  }, [query, selected, router, close]);

  const handleClear = useCallback(() => {
    const input = document.getElementById('search-field-input');
    setSelected(null);
    setQuery(null);
    input.focus();
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!debouncedQuery) {
        setOptions([]);
        return;
      }

      try {
        const res = await algoliaClient.searchForHits<HitAttributes>({
          requests: [{
            indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
            query: debouncedQuery,
            attributesToRetrieve: ['content.title'],
            hitsPerPage: 8,
          }],
        });
        const newOptions = res?.results?.[0]?.hits?.map((hit) => ({
          id: hit.objectID,
          title: hit.content.title,
        })) ?? [];

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
  }, [debouncedQuery]);

  useEffect(() => {
    setDebouncedQuery(query);

    if (query && showEmptyMessage) {
      setShowEmptyMessage(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <form
        action="/search"
        role="search"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Field className="relative flex items-start gap-16 w-full">
          <Label className="sr-only">Search Giving to Stanford</Label>
          <Combobox
            as="div"
            value={selected}
            onChange={(option) => setSelected(option)}
            className="relative w-full"
          >
            <ComboboxInput
              id="search-field-input"
              name="q"
              placeholder="Search"
              className="w-full bg-transparent border-t-0 border-x-0 border-b-1 border-b-white text-26 sm:text-30 md:text-[4rem] lg:text-[4.5rem] pr-90 sm:pr-100 md:pr-110 text-white font-semibold placeholder:text-foggy focus:!ring-0 focus:border-b-white focus:bg-white/5"
              onChange={(e) => setQuery(e.currentTarget.value)}
              displayValue={(option: { id: string, title: string }) => option ? option.title : ''}
              aria-describedby={showEmptyMessage ? 'search-field-modal-empty-message' : undefined}
              aria-required
              autoFocus
            />
            <ComboboxOptions portal={false} className="empty:invisible absolute top-full left-0 flex flex-col w-full z-[1000002] bg-palo-alto-dark text-white p-16 border border-t-0 border-white overflow-hidden rounded-bl rounded-br">
              {!!query && (
                <ComboboxOption value={{ id: null, title: query }} className="data-[focus]:bg-palo-verde-light px-4 py-8 rounded">
                  Custom: &ldquo;{query}&rdquo;
                </ComboboxOption>
              )}
              {options.map((option) => (
                <ComboboxOption key={option.id} value={option} className="data-[focus]:bg-palo-verde-light px-4 py-8 rounded">
                  {option.title}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
          {!!selected && (
            <button onClick={handleClear} className="absolute top-14 sm:top-18 md:top-22 lg:top-28 right-70 sm:right-76 md:right-100 flex gap-6 items-center justify-center text-white text-16 sm:text-18 md:text-20 min-h-24 hocus:underline">
              Clear <HeroIcon aria-hidden icon="close" className="!stroke-[4.5]" />
            </button>
          )}
          <button type="submit" className="flex items-center justify-center rounded-full bg-cardinal-red p-12 hocus:bg-plum transition-colors">
            <HeroIcon icon="search" title="Search" className="text-white w-24 sm:w-30 md:w-40 lg:w-50 aspect-1" />
          </button>
        </Field>
      </form>
      <Paragraph
        className={cnb('text-white font-bold rs-mt-2' , {
          'invisible': !showEmptyMessage,
          'visible': showEmptyMessage,
        })}
        aria-hidden={!showEmptyMessage}
        id="search-field-modal-empty-message"
        size="f0"
      >
        {emptySearchMessage}
      </Paragraph>
    </>
  );
};
