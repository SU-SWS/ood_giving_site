import React, { useContext } from 'react'
import { UserContext, doLogout, Anon } from "../../context/UserContext"

const LogoutButton = (props) => {
  const { state: account, dispatch } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let buttonLabel = props.buttonLabel ? props.buttonLabel : "Logout"

  if (user.status) {
    return (
      <button onClick={() => { doLogout; dispatch({type:'logout'})}}>{buttonLabel}</button>
    )
  }

  return null
}

export default LogoutButton
