import React, { useContext } from 'react'
import { doLogin } from "../../utilities/auth"
import { UserContext } from "../../context/UserContext"

const LoginButton = (props) => {
  const { state: user } = useContext(UserContext);

  if (!user.status) {
    return (
      <button onClick={doLogin}>{props.children}</button>
    )
  }

  return null
}

export default LoginButton
