/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */


 // Libraries.
import React from "react"
import UserContextProvider from "./src/context/UserContext"

// You can delete this file if you're not using it
import "./src/scss/index.scss";
import "./src/js/index.js";

export const wrapRootElement = ({ element }) => (
  <UserContextProvider>{element}</UserContextProvider>
)
