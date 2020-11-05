import React, { useContext } from 'react'
import { UserContext, doLogout, Anon } from "../../context/UserContext"

const LogoutButton = (props) => {
  const { state: account, dispatch } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon

  if (user.status) {
    return (
      <button onClick={() => { doLogout; dispatch({type:'logout'})}}>{props.children}</button>
    )
  }

  return null
}

export default LogoutButton
