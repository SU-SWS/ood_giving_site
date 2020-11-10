import React, { useContext } from 'react'
import { UserContext, Anon } from "../../context/UserContext"

const WhoIs = (props) => {

  const { state: account } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let profile = (account && account.profile) ? account.profile : {}
  let username = user.name ? user.name : user.email

  if (user.status) {
    return (
      <h4>Hello, {username}</h4>
    )
  }

  return null
}

export default WhoIs
