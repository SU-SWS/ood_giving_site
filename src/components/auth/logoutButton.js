import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { UserContext, Anon } from "../../context/UserContext"

const triggerLogout = () => {
  navigate("/user/logout");
}

const LogoutButton = (props) => {
  const { state } = useContext(UserContext);
  let user = Anon

  if (state && state.user) {
    user = state.user
  }

  if (user.status) {
    return (
      <button onClick={triggerLogout}>{props.children}</button>
    )
  }

  return null
}

export default LogoutButton
