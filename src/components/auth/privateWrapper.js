// import ...
import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../../utilities/auth"

const PrivateWrapper = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/user/login`) {
    navigate("/user/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateWrapper
