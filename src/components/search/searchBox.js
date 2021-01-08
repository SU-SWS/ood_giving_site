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
      </div>
    )
  })

  return <AlgoliaSearchBox />
}

export default SearchBox
