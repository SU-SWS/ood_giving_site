import React, { useEffect } from 'react'
import Layout from "../../components/layout"
import { doLogout } from "../../utilities/auth"

const LogOutPage = () => {

  useEffect(() => {
    doLogout()
  });

  return (
    <Layout>
      <h1>Logout Page</h1>
      <p>You have been logged out. I hope you enjoyed your time with us.</p>
    </Layout>
  )
}

export default LogOutPage
