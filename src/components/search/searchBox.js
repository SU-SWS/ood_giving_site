import React, { useEffect, useState } from "react"
import { connectSearchBox } from "react-instantsearch-dom"

const SearchBox = props => {
  const AlgoliaSearchBox = connectSearchBox(({ refine }) => {
    const [value, setValue] = useState(props.initialTerm)

    useEffect(() => {
      refine(value)
    }, [value])

    return (
      <input
        type="search"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
    )
  })

  return <AlgoliaSearchBox />
}

export default SearchBox
