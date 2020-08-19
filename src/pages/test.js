import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SbEditable from 'storyblok-react'
import Components from '../components/components.js'

export default function Header() {
  return (
    <StaticQuery
      query={graphql`
        query pageData {
          site {
            siteMetadata {
              title
              description
            }
          }
          storyblokEntry(slug: {eq: "sample-page"}) {
            content
            created_at
          }
        }
      `}
      render={data => (
        <>
        <header>
          <h1>{data.site.siteMetadata.title}</h1>
          <p>{data.site.siteMetadata.description}</p>
        </header>
        </>
      )}
    />

  )
}
