// Get the window.
const isBrowser = typeof window !== `undefined`

// Get the user from local storage.
const getUser = () =>
  window.localStorage.gatsbyUser
    ? JSON.parse(window.localStorage.gatsbyUser)
    : {}

// Set the user to local storage.
const setUser = user => (window.localStorage.gatsbyUser = JSON.stringify(user))

// Handle the authentication process.
export const handleLogin = ({ username, password }) => {
  if (!isBrowser) return false

  if (username === `gatsby` && password === `demo`) {
    console.log(`Credentials match! Setting the active user.`)
    return setUser({
      name: `Jim`,
      legalName: `James K. User`,
      email: `jim@example.org`,
    })
  }

  return false
}

// Check if the user is logged in.
export const isLoggedIn = () => {
  if (!isBrowser) return false
  const user = getUser()
  return !!user.email
}

// Get a user if there is one.
export const getCurrentUser = () => isBrowser && getUser()

// Do the logout.
export const logout = callback => {
  if (!isBrowser) return

  console.log(`Ensuring the \`gatsbyUser\` property exists.`)
  setUser({})
  callback()
}
