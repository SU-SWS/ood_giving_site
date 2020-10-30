import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { UserContext } from "../../context/UserContext"

const triggerLogout = () => {
  navigate("/user/logout");
}

const LogoutButton = (props) => {
  const { state: user } = useContext(UserContext);

  if (user.status) {
    return (
      <button onClick={triggerLogout}>{props.children}</button>
    )
  }

  return null
}

export default LogoutButton
