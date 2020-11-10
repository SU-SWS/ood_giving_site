import React, { useContext } from 'react'
import { UserContext, Anon } from "../../context/UserContext"

const UserInfoBlock = (props) => {

  const { state: account } = useContext(UserContext);
  let user = (account && account.user) ? account.user : Anon
  let profile = (account && account.profile) ? account.profile : {}
  let username = user.name ? user.name : user.email

  return (
    <div>
      <p>&nbsp;</p>
      <h1>Hello, {username}</h1>
      <p>&nbsp;</p>
      <p><strong>Raw user data: </strong></p>
      <pre>{JSON.stringify(user, undefined, 2)}</pre>
      <p><strong>Mega Profile: </strong></p>
      <pre>{JSON.stringify(profile, undefined, 2)}</pre>
      <p>&nbsp;</p>
    </div>
  )
}

export default UserInfoBlock
