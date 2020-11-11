import React, { useReducer, createContext } from "react"

// Variables.
// -----------------------------------------------------------------------------
const isBrowser = typeof window !== `undefined`
const loginPath =   "/api/sso/login"
const logoutPath =  "/api/sso/logout"
const statusPath =  "/api/sso/status"
const megaPath =    "/api/mega/profile"
const DONE = 0
const LOADING = 1
const PENDING = 2

// Anonymous User
const Anon = {
  name: "Anonymous",
  status: 0
}

// Default State.
const defaultState = {
  user: Anon,
  profile: false,
  loading: PENDING,
}

// The context.
const UserContext = createContext(defaultState)
const UserContextConsumer = UserContext.Consumer
const UserContextProvider = UserContext.Provider

/**
 * Reducer function for the user context state.
 *
 * @param {*} state
 * @param {*} action
 *
 * @return A new state.
 */
function UserContextReducer(state, action) {

  if (!state) {
    state = defaultState
  }

  switch(action.type) {
    case 'login':
      console.log("Dispatch: Login")
      return { ...state, user: action.user };

    case 'logout':
      console.log("Dispatch: Logout")
      doLogout()
      return defaultState;

    case 'addProfile':
      console.log("Dispatch: AddProfile")
      return { ...state, profile: action.profile }

    case 'rmProfile':
      console.log("Dispatch: Remove Profile")
      state.profile = false
      return { ...state }

    case 'startLoading':
      console.log("Dispatch: Start Loading")
      return { ...state, loading: LOADING }

    case 'doneLoading':
      console.log("Dispatch: Done Loading")
      return { ...state, loading: DONE }

    case 'refresh':
      console.log("Dispatch: Refresh")
      return { ...state, refresh: Math.random(10) }

    default:
      throw new Error();
  };

}

/**
 * User State Provider.
 *
 * This handles the state updates on the UserContext store.
 *
 * @param {*} param0
 *
 * @return JSX template wrapper.
 */
const UserStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserContextReducer)
  return (
    <UserContextProvider value={{ state, dispatch }}>
      {children}
    </UserContextProvider>
  )
}


// Get user status from the SSO Object
// -----------------------------------------------------------------------------
const fetchSSOStatus = async () => {

  let result = await fetch(statusPath)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return false
    })
    .then(data => {
      if (!data || !data.session || !data.status) {
        return false
      }

      return data
    })
    .catch(error => {
      console.error('login error is', error)
      return false
    })

  return result
}

// Get mega profile data from the api
// -----------------------------------------------------------------------------
const fetchMegaProfile = async (encodedSUID) => {

  let result = await fetch(megaPath + "/" + encodedSUID)
    .then(response => {
      if (response.ok) {
        try {
          let data = response.json()
          return data
        }
        catch(e) {
          return false
        }
      }
      return false
    })
    .then(data => {
      if (!data || !data.encodedSUID) {
        return false
      }
      return data
    })
    .catch(error => {
      console.error('login error is', error)
      return false
    })

  return result
}

// Check if the user is logged in.
//
// We cannot trust cookies or local storage as the end user can modify those
// values directly in the browser. To validate if the user is logged in we need
// to validate their JWT information status. Hit up our end point to do that.
// -----------------------------------------------------------------------------
const isLoggedIn = async () => {

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
      console.error('login error is', error)
      return false
    })

  return result
}

// Trigger the SP initiated login.
// -----------------------------------------------------------------------------
const doSSOLogin = () => {
  if (!isBrowser) return false
  // Log the page the user is on before sending out so we can redirect back
  // to the right place.
  window.sessionStorage.setItem("returnto", window.location.pathname);
  // Hitting this URL will trigger the login.
  window.location = loginPath;
}

// Needs work.
// -----------------------------------------------------------------------------
const doLogin = () => {
  doSSOLogin()
}

// Log the user out of any session/tokens on the LAMBDA side of things.
// -----------------------------------------------------------------------------
const doSSOLogout = async () => {
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
      console.error('logout error is', error)
      return false
    })

  return sus
}

// Do the logout. Everywhere.
const doLogout = () => {
  if (isBrowser) { window.user = null }
  doSSOLogout()
}

export {
  Anon,
  UserContext,
  UserContextConsumer,
  UserContextProvider,
  UserStateProvider,
  fetchSSOStatus,
  fetchMegaProfile,
  isLoggedIn,
  doSSOLogin,
  doLogin,
  doSSOLogout,
  doLogout
}
