import React from 'react'
import { isLoggedIn } from "../../utilities/auth"

const alerter = () => {
  alert("Clicked me")
}

const LogoutButton = (props) => {

  // Show the button if the user is logged in.
  if (isLoggedIn()) {
    return (
      <button onClick={alerter}>{props.children}</button>
    )
  }

  // Don't show nothing if the user is not logged in.
  return null
};

export default LogoutButton
