// Get the window.
const isBrowser = typeof window !== `undefined`
const userKey = "user"

// Get the user from session storage.
// -----------------------------------------------------------------------------
const getUser = () => {
  return JSON.parse(window.sessionStorage.getItem(userKey));
}

// Set the user to session storage.
// -----------------------------------------------------------------------------
const setUser = (user) => {
  window.sessionStorage.setItem(userKey, JSON.stringify(user));
  return true;
}

// Handle the authentication process by kicking off IDCS or SAML.
// -----------------------------------------------------------------------------
export const handleLogin = () => {
  if (!isBrowser) return false

  // Here we do something to handle the login itself. Kick off saml or Idcs.
  if (isBrowser) {
    setUser({"name": "Shea"});
    return true;
  }

  return false
}

// Check if the user is logged in.
// -----------------------------------------------------------------------------
export const isLoggedIn = () => {
  if (!isBrowser) return false
  return true;
}

// Log the user out.
// -----------------------------------------------------------------------------
export const logout = () => {
  if (!isBrowser) return
  setUser({})
  return true
}

// Set Token.
// -----------------------------------------------------------------------------
export const setToken = () => {
  if (!isBrowser) return
  return true
}

// Get Token.
// -----------------------------------------------------------------------------
export const getToken = () => {
  if (!isBrowser) return
  return true
}

// Get Token.
// -----------------------------------------------------------------------------
export const validateToken = () => {
  if (!isBrowser) return
  return true
}
