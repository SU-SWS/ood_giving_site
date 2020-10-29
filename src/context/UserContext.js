import React, { useState, createContext, useEffect } from "react"

export const UserStateContext = createContext(false)
export const UserStateConsumer = UserStateContext.Consumer
export const UserStateProvider = UserStateContext.Provider

// The main thing.
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({name: "Anonymous", status: 0})

  useEffect(() => {
    // Set the user from Session Storage.
    setUser({name: "Shea McKinney", email: "sheamck@stanford.edu", status: 1});
  })

  // Render the wrapper.
  return (
    <UserStateContext.Provider value={user}>
      {children}
    </UserStateContext.Provider>
  )
}

export default UserContextProvider
