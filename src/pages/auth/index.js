import React from "react"
import Layout from "../../components/layout"
import Link from "gatsby-link"

const Authd = () => (
  <Layout>
    <h1>Authentication Successful</h1>
    <p>You can only see this if you are logged in.</p>
    <Link to={`/logout`}>Log out</Link>
  </Layout>
)

export default Authd
