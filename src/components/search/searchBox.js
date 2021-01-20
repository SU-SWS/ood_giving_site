import React, { useEffect, useState } from "react"
import { connectSearchBox } from "react-instantsearch-dom"

const SearchBox = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(props.initialTerm)

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      props.onSubmit?.()
    }
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  return (
    <form role="search" className="search-input">
      <input
        type="text"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        ref={ref}
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
        onClick={props.onSubmit}
        type="submit"
      >
        <span className="search-input-submit-button-icon" />
      </button>
    </form>
  )
})

export default SearchBox

export const AlgoliaSearchBox = props => {
  const InnerAlgoliaSearchBox = connectSearchBox(({ refine }) => (
    <SearchBox
      initialTerm={props.initialTerm}
      onChange={refine}
      onSubmit={props.onSubmit}
    />
  ))

  return <InnerAlgoliaSearchBox />
}
