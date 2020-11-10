import React, { useContext } from 'react'
import { UserContext, doLogin, Anon } from "../../context/UserContext"

const LoginButton = (props) => {
  const { state: account } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let buttonLabel = props.buttonLabel ? props.buttonLabel : "Login"

  if (!user.status) {
    return (
      <button onClick={doLogin}>{buttonLabel}</button>
    )
  }

  return null
}

export default LoginButton
