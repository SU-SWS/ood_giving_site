import React, { useContext } from 'react'
import { UserContext, Anon } from "../../context/UserContext"

const LogoutButton = (props) => {
  const { state: account, dispatch } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let buttonLabel = props.buttonLabel ? props.buttonLabel : "Logout"

  if (user.status) {
    return (
      <button onClick={() => {dispatch({type:'logout'})}}>{buttonLabel}</button>
    )
  }

  return null
}

export default LogoutButton
