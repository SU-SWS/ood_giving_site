import React from "react"
import Wrapper from "../../components/layout/wrapper"
import PrivateRoute from "../../components/privateRoute"
import { Router } from "@reach/router"

const Authd = (props) => {
  return (
    <Router basepath="/auth">
      <Wrapper default heading="Default" />
      <PrivateRoute path="/test" component={Wrapper} />
      <PrivateRoute path="/test2" component={Wrapper} />
    </Router>
  )
}

export default Authd
