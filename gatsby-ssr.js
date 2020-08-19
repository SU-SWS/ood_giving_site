/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
export const onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  setPostBodyComponents([
    <script
      key="masonry"
      src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"
    />,
  ])
}