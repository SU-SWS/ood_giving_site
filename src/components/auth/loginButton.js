import React, { useContext } from 'react'
import { UserContext, doLogin, Anon } from "../../context/UserContext"

const LoginButton = (props) => {
  const { state: account } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon

  console.log("Rendering the login button")
  console.log(user)

  if (!user.status) {
    return (
      <button onClick={doLogin}>{props.children}</button>
    )
  }

  return null
}

export default LoginButton
