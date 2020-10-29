import React, { useState, useEffect } from 'react'
import { doLogin } from "../../utilities/auth"
import { UserStateConsumer } from "../../context/UserContext"

const LoginButton = (props) => {

  return (
    <UserStateConsumer>
      {user => {
        return user.status ? null : <button onClick={doLogin}>{props.children}</button>
      }}
    </UserStateConsumer>
  )
};

export default LoginButton
