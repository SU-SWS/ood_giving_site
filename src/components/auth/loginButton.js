import React, { useContext } from 'react'
import { doLogin } from "../../utilities/auth"
import { UserContext, Anon } from "../../context/UserContext"

const LoginButton = (props) => {
  const { state } = useContext(UserContext);
  let user = Anon

  if (state && state.user) {
    user = state.user
  }

  if (!user.status) {
    return (
      <button onClick={doLogin}>{props.children}</button>
    )
  }

  return null
}

export default LoginButton
