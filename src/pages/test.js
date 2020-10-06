import React from "react"
import Layout from "../components/layout"
import Link from "gatsby-link"

const ThisIsJustATest = () => (
  <Layout>
    <h1>Authentication Test Page</h1>
    <p>
      <Link to={`/login`}>Log in</Link> | <Link to={`/login`}>Log out</Link>
    </p>
  </Layout>
)

export default ThisIsJustATest
