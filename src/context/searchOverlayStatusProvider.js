import React, { useState } from "react"
import SearchOverlay from "../components/search/searchOverlay"

export const SearchOverlayOpenContext = React.createContext()
const SearchOverlayOpenContextProvider = props => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <SearchOverlayOpenContext.Provider
      value={{
        isOpen,
        toggleSearchOverlay: () => setIsOpen(!isOpen),
      }}
    >
      {props.children}
    </SearchOverlayOpenContext.Provider>
  )
}
export default ({ element }) => (
  <SearchOverlayOpenContextProvider>
    {element}
    <SearchOverlay />
  </SearchOverlayOpenContextProvider>
)
