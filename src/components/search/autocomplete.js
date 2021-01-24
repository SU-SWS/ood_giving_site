import React, { useEffect, useState, useMemo, useRef } from "react";
import AutoSuggest from "react-autosuggest";
import { connectAutoComplete } from "react-instantsearch-dom";
import { useLocation } from "@reach/router";
import qs from "query-string";

const Autocomplete = React.forwardRef((props, ref) => {
  const [initialTerm, setInitialTerm] = useState("");

  const { search } = useLocation();

  useEffect(() => {
    const params = qs.parse(search);

    if (params.term) {
      setInitialTerm(params.term);
    }
  }, [search]);

  const AlgoliaAutocomplete = useMemo(
    connectAutoComplete(({ refine, hits, currentRefinement }) => {
      const [value, setValue] = useState(initialTerm);
      const [currentSuggestions, setCurrentSuggestions] = useState([]);
      const [shouldRenderSuggestions, setShouldRenderSuggestions] = useState(
        false
      );

      const handleSubmit = ($event, data) => {
        $event?.preventDefault();

        if (data) {
          // submission by selecting a suggestion
          props.onSubmit(data.suggestionValue);
        } else {
          // submission by pressing Enter key or clicking submit button
          props.onSubmit(value);
        }
      };

      const onChange = (_, { newValue }) => {
        if (!newValue) props.onSuggestionCleared();
        setValue(newValue);
      };

      const onKeyDown = event => {
        if (event.key === "Enter") {
          handleSubmit(event);
        }
      };

      const inputProps = {
        ref,
        value,
        type: "text",
        placeholder: "Search",
        onChange,
        onKeyDown,
        onFocus: () => setShouldRenderSuggestions(true),
      };

      const handleSuggestionsFetch = data => {
        const newValue = data?.value ?? "";

        refine(newValue);
      };

      useEffect(() => {
        if (initialTerm) props.onSubmit(initialTerm);
      }, [initialTerm]);

      useEffect(() => {
        if (value && value === currentRefinement) {
          setCurrentSuggestions(hits);
        } else if (!value && currentSuggestions.length) {
          setCurrentSuggestions([]);
        }
      }, [currentSuggestions, hits, value, currentRefinement]);

      // The following useEffect's are necessary to never show stale suggestions
      useEffect(() => {
        setShouldRenderSuggestions(!!value);
      }, [value]);

      const prevHitsRef = useRef(hits);

      useEffect(() => {
        setShouldRenderSuggestions(
          JSON.stringify(hits) !== JSON.stringify(prevHitsRef.current)
        );
        prevHitsRef.current = hits;
      }, [hits]);

      return (
        <form role="search" className="search-input">
          <AutoSuggest
            suggestions={shouldRenderSuggestions ? currentSuggestions : []}
            onSuggestionsFetchRequested={handleSuggestionsFetch}
            onSuggestionsClearRequested={() => {}}
            onSuggestionSelected={handleSubmit}
            getSuggestionValue={hit => hit.query}
            renderSuggestion={hit => hit.query}
            inputProps={inputProps}
          />
          {value && (
            <button
              className="search-input-clear-button"
              onClick={() => {
                setValue("");
                props.onSuggestionCleared();
              }}
              aria-label="Clear search input"
            >
              <span className="search-input-clear-text">Clear</span>
              <span aria-hidden="true" className="search-input-clear-icon" />
            </button>
          )}

          <button
            className="search-input-submit-button"
            onClick={handleSubmit}
            type="submit"
          >
            <span className="su-sr-only-element">Submit search</span>
            <span
              className="search-input-submit-button-icon"
              aria-hidden="true"
            />
          </button>
        </form>
      );
    }),
    [initialTerm]
  );

  return AlgoliaAutocomplete;
});

export default Autocomplete;
