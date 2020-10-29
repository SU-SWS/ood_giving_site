/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"

export function onRenderBody({ setHeadComponents, setPostBodyComponents }) {
  setHeadComponents([
    <script key="stripe" src="https://js.stripe.com/v3"  type="text/javascript" async />,
  ])
}
