import React from "react"
import Layout from "../../components/layout"
import LoginButton from "../../components/auth/LoginButton"
import LogoutButton from "../../components/auth/LogoutButton"

const LoginPage = () => (
  <Layout>
    <h1>Login Page</h1>
    <p>
      <LoginButton>Login</LoginButton> | <LogoutButton>Logout</LogoutButton>
    </p>
  </Layout>
)

export default LoginPage
