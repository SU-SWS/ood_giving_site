// Variables.
// -----------------------------------------------------------------------------
const isBrowser = typeof window !== `undefined`
const userKey = "user"
const loginPath = "/api/sso/login"
const logoutPath = "/api/sso/logout"
const statusPath = "/api/sso/status"

// Check if the user is logged in.
// -----------------------------------------------------------------------------
export const fetchUserData = async () => {

  let result = await fetch(statusPath)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return false
    })
    .then(data => {
      if (!data || !data.token) {
        return false
      }
      delete data.token
      return data
    })
    .catch(error => {
      console.log('login error is', error)
      return false
    })

  return result
}

// Check if the user is logged in.
// -----------------------------------------------------------------------------
export const isLoggedIn = async () => {

  let result = await fetch(statusPath)
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

      return true
    })
    .catch(error => {
      console.log('login error is', error)
      return false
    })

  return result
}

// Log the user out.
// -----------------------------------------------------------------------------
export const doLogin = () => {
  if (!isBrowser) return false
  // Log the page the user is on before sending out so we can redirect back
  // to the right place.
  window.sessionStorage.setItem("returnto", window.location.pathname);
  // Hitting this URL will trigger the login.
  window.location = loginPath;
}

// Log the user out.
// -----------------------------------------------------------------------------
export const doLogout = async () => {
  if (!isBrowser) return false

  // Kill any sessions or cookies.
  let sus = await fetch(logoutPath)
    .then(response => {
      if (response.ok) {
        return true
      }
      return false
    })
    .catch(error => {
      console.log('logout error is', error)
      return false
    })

  return sus
}
