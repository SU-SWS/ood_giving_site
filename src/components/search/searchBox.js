import React, { useEffect, useState } from "react"
import { connectSearchBox } from "react-instantsearch-dom"

const SearchBox = props => {
  const AlgoliaSearchBox = connectSearchBox(({ refine }) => {
    const [value, setValue] = useState(props.initialTerm)

    useEffect(() => {
      refine(value)
    }, [value])

    return (
      <div className="search-input">
        <input
          type="text"
          value={value}
          onChange={event => setValue(event.currentTarget.value)}
        />
        {value && (
          <button
            className="search-input-clear-button"
            onClick={() => setValue("")}
            title="Clear input"
          >
            <span className="search-input-clear-icon" />
          </button>
        )}

        <button
          className="search-input-submit-button"
          title="Submit search"
          onClick={() => {
            if (!value) props.onEmptySearch()
          }}
        >
          <span className="search-input-submit-button-icon" />
        </button>
      </div>
    )
  })

  return <AlgoliaSearchBox />
}

export default SearchBox
