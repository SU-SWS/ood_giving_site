import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { UserStateConsumer } from "../../context/UserContext"

const triggerLogout = () => {
  navigate("/user/logout");
}

const LogoutButton = (props) => {

  return (
    <UserStateConsumer>
      {user => {
        return user.status ? <button onClick={triggerLogout}>{props.children}</button> : null
      }}
    </UserStateConsumer>
  )
}

export default LogoutButton
