import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Autocomplete, TextField } from '@mui/material';
import { useInstantSearch, useSearchBox } from 'react-instantsearch';
import { X, Search } from 'react-hero-icon/solid';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import SearchModalContext from './Modal/SearchModalContext';

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
const SearchField = ({ emptySearchMessage }) => {
  // Algolia Client.
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY,
  );
  const indexName = 'crawler_federated-search';
  const index = algoliaClient.initIndex(indexName);

  // Hooks and state.
  const { query, refine, clear } = useSearchBox();
  const [value, setValue] = useState(query);
  const [inputValue, setInputValue] = useState(query);
  const [emptySearch, setEmptySearch] = useState(false);
  const debouncedInputValue = useDebouncedValue(inputValue);
  const [options, setOptions] = useState([]);
  const { searchInputRef } = useContext(SearchModalContext);
  const { indexUiState } = useInstantSearch();

  // Debounce the input value and fetch options.
  // -------------------------------------------
  useEffect(() => {
    const fetchOptions = async () => {
      if (!debouncedInputValue) {
        setOptions([]);
        return;
      }

      // Add the filters to the autocomplete as well.
      const siteRefinements = indexUiState?.refinementList?.siteName || [];
      const typeRefinements = indexUiState?.refinementList?.fileType || [];
      const namedSiteRefinements = siteRefinements.map(
        (site) => `siteName:${site}`,
      );
      const namedTypeRefinements = typeRefinements.map(
        (type) => `fileType:${type}`,
      );
      const facetFilters = [namedSiteRefinements, namedTypeRefinements];

      try {
        const res = await index.search(debouncedInputValue, {
          attributesToRetrieve: ['title'],
          hitsPerPage: 10,
          facetFilters,
        });
        const newOptions = res.hits.map((hit) => hit.title);

        if (!newOptions?.length && !options?.length) {
          setOptions([]);
          return;
        }

        setOptions(newOptions);
      } catch (err) {
        setOptions([]);
      }
    };

    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, indexUiState]);

  // Handle input change as the user types
  // --------------------------------------
  const handleInputChange = useCallback(
    (v) => {
      setInputValue(v);
    },
    [setInputValue],
  );

  // Handle value change when the user selects an option.
  // ----------------------------------------------------
  const handleValueChange = useCallback(
    (v) => {
      setValue(v);
      refine(v);
      if (v.length > 0) {
        setEmptySearch(false);
      } else {
        setEmptySearch(true);
      }
    },
    [setValue, refine, setEmptySearch],
  );

  // Handle form submission.
  // -----------------------
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleValueChange(inputValue, refine, setEmptySearch);
    },
    [setEmptySearch, handleValueChange, refine, inputValue],
  );

  // Handle clearing the search field.
  // ---------------------------------
  const handleClear = useCallback(() => {
    setInputValue('');
    setValue('');
    clear();
    searchInputRef.current.focus();
  }, [setInputValue, setValue, clear, searchInputRef]);

  // The search field component.
  // ---------------------------
  return (
    <>
      <form
        onSubmit={handleSubmit}
        role="search"
        className="su-flex su-items-center su-w-full su-gap-16"
      >
        <div className="su-w-full">
          <Autocomplete
            freeSolo
            id="search-field-input"
            data-test="search--input"
            popupIcon={null}
            disableClearable
            disablePortal
            inputValue={inputValue}
            value={value}
            onInputChange={(_e, v) => handleInputChange(v)}
            onChange={(_e, v) => handleValueChange(v)}
            filterOptions={(x) => x}
            options={options}
            noOptionsText="No results found"
            renderInput={(params) => (
              <TextField
                inputRef={searchInputRef}
                {...params}
                error={emptySearch}
                placeholder="something..."
                variant="standard"
                data-test="search--input-field"
                slotProps={{
                  inputLabel: {
                    className:
                      'su-font-sans !su-text-18 md:!su-text-21 su-pl-20',
                  },
                  htmlInput: {
                    ...params.inputProps,
                    'aria-label': 'Search for something...',
                    'aria-describedby': emptySearch
                      ? 'search-page-empty-message'
                      : undefined,
                  },
                }}
              />
            )}
            renderOption={(props, option) => {
              // eslint-disable-next-line no-unused-vars
              const { className, ...rest } = props;
              return (
                <li
                  className="su-border-none su-rounded-full su-rs-px-1 su-mx-10 su-py-5 su-text-white su-decoration-1 su-underline-offset-2 su-cursor-pointer"
                  {...rest}
                >
                  <span>{option}</span>
                </li>
              );
            }}
            slotProps={{
              popper: {
                sx: {
                  '& .Mui-focused': {
                    backgroundColor: 'rgb(229, 8, 8)',
                    textDecoration: 'underline',
                  },
                },
              },
            }}
            classes={{
              inputRoot:
                '!su-text-18 md:!su-text-21 !su-font-sans !su-p-0 focus-within:before:!su-border-lagunita before:!su-border-b-2 before:!su-border-b-black-50 after:!su-border-b-0',
              input: '!su-px-20 !su-text-m2 !su-placeholder-black-true',
              clearIndicator:
                '!su-text-18 !su-bg-transparent !su-text-transparent',
              paper:
                '!su-shadow-none md:!su-shadow-lg su-mt-2 md:!su-shadow-black/30 md:!su-rounded-b !su-font-sans !su-text-18 md:!su-text-21 !su-bg-cardinal-red-xxdark !su-border !su-border-digital-red su-z-10',
            }}
          />
          {!!query && (
            <button
              type="button"
              onClick={handleClear}
              className="su-flex su-items-center su-text-16 su-text-digital-red hocus:su-text-digital-red-dark su-transition-colors su-ml-auto su-mt-8"
            >
              <X className="su-w-16 su-h-16" aria-hidden />
              Clear search
            </button>
          )}
        </div>
        <div>
          <button
            type="submit"
            aria-label="Search Stanford Alumni sites"
            className="su-flex su-items-center su-justify-center su-shrink-0 su-rounded-full su-w-36 su-h-36 md:su-w-50 md:su-h-50 su-bg-digital-red-light hocus:su-bg-cardinal-red-dark su-transition-colors"
            data-test="search--submit-btn"
          >
            <Search
              aria-hidden
              className="su-transition su-text-white su-w-18 md:su-w-30 su-h-18 md:su-h-30"
            />
          </button>
        </div>
      </form>
      {emptySearch && (
        <p
          className="su-text-m1 su-font-serif su-font-bold su-rs-mt-2 su-mb-0"
          id="search-page-empty-message"
        >
          {emptySearchMessage}
        </p>
      )}
    </>
  );
};

export default SearchField;
