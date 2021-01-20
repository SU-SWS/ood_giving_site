import React, { useEffect, useRef, useState } from "react"
import SearchOverlay from "../components/search/searchOverlay"

export const SearchOverlayOpenContext = React.createContext()
const SearchOverlayOpenContextProvider = props => {
  const [isOpen, setIsOpen] = useState(false)
  const previousBodyOverflowProperty = useRef("")

  useEffect(() => {
    if (isOpen) {
      previousBodyOverflowProperty.current = document.body.style.overflow
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = previousBodyOverflowProperty.current
    }
  }, [isOpen])

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
