// Get the window.
const isBrowser = typeof window !== `undefined`
const userKey = "user"

// Get the user from session storage.
// -----------------------------------------------------------------------------
export const getUser = () => {
  return JSON.parse(window.sessionStorage.getItem(userKey));
}

// Set the user to session storage.
// -----------------------------------------------------------------------------
export const setUser = (user) => {
  window.sessionStorage.setItem(userKey, JSON.stringify(user));
  return true;
}

// Check if the user is logged in.
// -----------------------------------------------------------------------------
export const isLoggedIn = () => {

  return fetch(`/api/sso/status`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return false
    })
    .then(data => {
      if (!data) {
        return false
      }
      delete data.token
      setUser(data)
      return true
    })
    .catch(error => {
      console.log('login error is', error)
      return false
    })
}

// Log the user out.
// -----------------------------------------------------------------------------
export const logout = () => {
  if (!isBrowser) return
  setUser({})
  return true
}
