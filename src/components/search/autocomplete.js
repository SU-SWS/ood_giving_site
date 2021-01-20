import React, { useEffect, useState, useMemo } from "react"
import AutoSuggest from "react-autosuggest"
import { connectAutoComplete } from "react-instantsearch-dom"
import { useLocation } from "@reach/router"
import qs from "query-string"

const Autocomplete = React.forwardRef((props, ref) => {
  const [initialTerm, setInitialTerm] = useState("")

  const { search } = useLocation()

  useEffect(() => {
    const params = qs.parse(search)

    if (params.term) {
      setInitialTerm(params.term)
    }
  }, [search])

  const AlgoliaAutocomplete = useMemo(
    connectAutoComplete(({ refine, hits }) => {
      const [value, setValue] = useState(initialTerm)
      const [currentSuggestions, setCurrentSuggestions] = useState([])

      const handleSubmit = ($event, data) => {
        $event?.preventDefault()

        if (data) {
          // submission by selecting a suggestion
          props.onSubmit(data.suggestionValue)
        } else {
          // submission by pressing Enter key or clicking submit button
          props.onSubmit(value)
        }
      }

      const onChange = (_, { newValue }) => {
        if (!newValue) props.onSuggestionCleared()
        setValue(newValue)
      }

      const onKeyDown = event => {
        if (event.key === "Enter") {
          handleSubmit(event)
        }
      }

      const inputProps = {
        ref,
        value,
        type: "text",
        placeholder: "Search",
        onChange,
        onKeyDown,
      }

      const handleSuggestionsFetch = data => {
        const newValue = data?.value ?? ""

        refine(newValue)
      }

      useEffect(() => {
        if (initialTerm) props.onSubmit(initialTerm)
      }, [initialTerm])

      return (
        <form role="search" className="search-input">
          <AutoSuggest
            suggestions={hits}
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
                setValue("")
                props.onSuggestionCleared()
              }}
              title="Clear input"
            >
              <span className="search-input-clear-text">Clear</span>
              <span className="search-input-clear-icon" />
            </button>
          )}

          <button
            className="search-input-submit-button"
            onClick={handleSubmit}
            type="submit"
          >
            <span
              className="search-input-submit-button-icon"
              aria-hidden="true"
            />
            <span className="su-sr-only-element">Submit search</span>
          </button>
        </form>
      )
    }),
    [initialTerm]
  )

  return AlgoliaAutocomplete
})

export default Autocomplete
