import React from "react"
import Layout from "../components/layout"

const Login = (props) => {

  const user = {
    name: `Jim`,
    legalName: `James K. User`,
    email: `jim@example.org`,
  }
  window.localStorage.gatsbyUser = JSON.stringify(user)

  return (<Layout>
    <h1>Login Page</h1>
  </Layout>
  )
}

export default Login
