/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/scss/index.scss";
import "./src/js/index.js";

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

export const shouldUpdateScroll = ({routerProps: { location }}) => {
  if (location.hash) {
    return false;
  }
  return true;
}

import SearchOverlayProvider from './src/context/searchOverlayStatusProvider';
export const wrapRootElement = SearchOverlayProvider;