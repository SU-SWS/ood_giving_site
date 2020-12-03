/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import SearchOverlayProvider from './src/context/searchOverlayStatusProvider';
export const wrapRootElement = SearchOverlayProvider;