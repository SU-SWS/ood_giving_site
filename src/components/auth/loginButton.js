import React from 'react'
import { isLoggedIn } from "../../utilities/auth"

const kickoffLoginSequence = () => {
  // Log the page the user is on before sending out so we can redirect back
  // to the right place.
  window.sessionStorage.setItem("returnto", window.location.pathname);
  // Hitting this URL will trigger the login.
  window.location = "/api/sso/login";
}

const LoginButton = (props) => {

  // If the user is logged don't show the button.
  if (isLoggedIn()) {
    return null
  }

  // If the user is not logged in show the button.
  return (
    <button onClick={kickoffLoginSequence}>{props.children}</button>
  )
};

export default LoginButton
