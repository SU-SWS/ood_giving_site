// import ...
import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../utilities/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
