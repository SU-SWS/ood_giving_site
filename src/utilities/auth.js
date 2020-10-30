// Variables.
// -----------------------------------------------------------------------------
const isBrowser = typeof window !== `undefined`
const userKey = "user"
const loginPath = "/api/sso/login"
const logoutPath = "/api/sso/logout"
const statusPath = "/api/sso/status"

// Get the user from session storage.
// -----------------------------------------------------------------------------
export const getUser = () => {
  if (!isBrowser) {
    return false
  }

  // If user data is already available use that.
  const user = JSON.parse(window.sessionStorage.getItem(userKey));
  if (user && user.name) {
    return user;
  }

  return false
}

// Set the user to session storage.
// -----------------------------------------------------------------------------
export const setUser = (user) => {
  if (!isBrowser) return false
  window.sessionStorage.setItem(userKey, JSON.stringify(user));
  return true;
}

// Remove the user from session storage.
// -----------------------------------------------------------------------------
export const removeUser = () => {
  if (!isBrowser) return
  window.sessionStorage.removeItem(userKey);
  return true;
}

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
      if (!data) {
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
      delete data.token
      setUser(data)
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

  // Remove Local Storage.
  removeUser()

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
