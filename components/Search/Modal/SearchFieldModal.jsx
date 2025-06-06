/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
// eslint-disable-next-line no-unused-vars
import algoliasearch from 'algoliasearch/lite';
import { Autocomplete, TextField } from '@mui/material';
import { X, Search } from 'react-hero-icon/solid';
import { navigate } from 'gatsby-link';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import SearchModalContext from './SearchModalContext';

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
const SearchFieldModal = React.forwardRef(({ emptySearchMessage }, ref) => {
  // Algolia Client.
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY,
  );
  const indexName = 'crawler_federated-search';
  const index = algoliaClient.initIndex(indexName);

  // Hooks and state.
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebouncedValue(inputValue);
  const [options, setOptions] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const { close, modalSearchInputRef } = useContext(SearchModalContext);

  // Debounce the input value and fetch options.
  // -------------------------------------------
  useEffect(() => {
    const fetchOptions = async () => {
      if (!debouncedInputValue) {
        setOptions([]);
        return;
      }

      try {
        const res = await index.search(debouncedInputValue, {
          attributesToRetrieve: ['title'],
          hitsPerPage: 8,
        });
        const newOptions = res.hits.map((hit) => hit.title);

        if (!newOptions?.length && !options?.length) {
          return;
        }

        setOptions(newOptions);
      } catch (err) {
        setOptions([]);
      }
    };

    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  // Handle input change.
  // --------------------
  const handleInputChange = useCallback(
    (v) => {
      setInputValue(v);
      setShowEmptyMessage(false);
    },
    [setInputValue],
  );

  // Handle value change when the user selects an option.
  // ----------------------------------------------------
  const handleValueChange = useCallback(
    (v) => {
      setValue(v);
      setShowEmptyMessage(false);
    },
    [setValue],
  );

  // Handle form submission.
  // -----------------------
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!inputValue || !inputValue.trim().length) {
        setShowEmptyMessage(true);
        return;
      }

      setValue(inputValue);
      navigate(`/search?q=${inputValue}`);
      close();
    },
    [setValue, inputValue, close],
  );

  // Handle clear button click.
  // --------------------------
  const handleClear = useCallback(() => {
    setInputValue('');
    setValue('');
    modalSearchInputRef.current.focus();
  }, [setInputValue, setValue, modalSearchInputRef]);

  // Render the search field.
  // ------------------------
  return (
    <>
      <form
        onSubmit={handleSubmit}
        role="search"
        className="su-flex su-items-center su-w-full su-gap-16"
      >
        <div className="su-flex su-w-full su-items-center su-relative su-border-b-2 su-border-black-10">
          <Autocomplete
            freeSolo
            popupIcon={null}
            disableClearable
            disablePortal
            inputValue={inputValue}
            onInputChange={(_e, v) => handleInputChange(v)}
            value={value}
            onChange={(_e, v) => handleValueChange(v)}
            filterOptions={(x) => x}
            options={options}
            className="[&_label.MuiInputLabel-shrink]:su-text-black-80 [&_label.MuiInputLabel-shrink]:!-su-translate-y-8 [&_label.MuiInputLabel-shrink]:!su-scale-75 su-grow"
            renderInput={(params) => (
              <TextField
                {...params}
                error={showEmptyMessage}
                variant="standard"
                placeholder="Search"
                inputRef={ref}
                data-test="search--modal-input"
                slotProps={{
                  input: { ...params.InputProps },
                  htmlInput: {
                    ...params.inputProps,
                    'aria-label': 'Search',
                    'aria-describedby': showEmptyMessage
                      ? 'search-field-modal-empty-message'
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
                '!su-text-18 md:!su-text-21 !su-font-sans !su-p-0 focus-within:before:!su-border-none before:!su-border-none after:!su-border-none',
              input:
                'search-input-modal !su-border-0 !su-bg-transparent !su-text-black-10 !su-text-black-40::placeholder !su-w-full !su-flex-1 !su-rs-px-2 !su-py-02em !su-text-m3 !md:su-text-m4 !su-leading-display focus:!su-outline-none focus:!su-ring-0 focus:!su-ring-transparent',
              paper:
                '!su-w-[calc(100%_+_106px)] !su-shadow-none md:!su-shadow-lg md:!su-shadow-black/30 md:!su-rounded-b !su-font-sans !su-text-18 md:!su-text-21 !su-bg-cardinal-red-xxdark !su-border !su-border-digital-red-light',
            }}
          />
          {!!inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="su-flex su-items-center su-transition-colors su-ml-auto hocus:su-text-digital-red-xlight hocus:su-underline su-text-m0 md:su-text-m1 su-font-semibold su-border-none su-text-white su-p-0 focus:!su-bg-transparent su-rs-mr-1 su-mt-03em"
            >
              Clear
              <X
                className="su-inline-block su-ml-3 su-h-[1.1em] su-w-[1.1em]"
                aria-hidden
              />
            </button>
          )}
        </div>
        <div>
          <button
            type="submit"
            aria-label="Search Stanford Alumni sites"
            className="su-flex su-items-center su-justify-center su-min-w-[4rem] su-w-40 su-h-40 md:su-min-w-[7rem] md:su-w-70 md:su-h-70 md:children:su-w-40 md:children:su-h-40 su-rounded-full su-transition-colors su-bg-digital-red hocus:su-bg-digital-red-xlight su-origin-center !su-ml-0"
            data-test="search--submit-btn"
          >
            <Search
              aria-hidden
              className="su-transition su-text-white su-w-18 md:su-w-30 su-h-18 md:su-h-30"
            />
          </button>
        </div>
      </form>
      {showEmptyMessage && (
        <p
          className="su-text-m1 su-text-white su-font-serif su-font-bold su-rs-mt-2 su-mb-0"
          id="search-field-modal-empty-message"
        >
          {emptySearchMessage}
        </p>
      )}
    </>
  );
});

export default SearchFieldModal;
