import { useStaticQuery, graphql } from 'gatsby';

/**
 * @returns {{
 *  categoriesHeadline: string,
 *  categoriesLeftBox: object[],
 *  categoriesLeftHeadline: string,
 *  categoriesRightBox: object[],
 *  categoriesRightHeadline: string,
 *  introduction: string,
 *  emptySearchMessage: string,
 *  suggestionsAmount?: number,
 * }},
 */
const UseSearchOverlayData = () => {
  const {
    allStoryblokEntry: {
      nodes: [{ content }],
    },
  } = useStaticQuery(
    graphql`
      query {
        allStoryblokEntry(
          filter: {
            full_slug: { eq: "global-components/search-overlay/search-overlay" }
          }
        ) {
          nodes {
            content
          }
        }
      }
    `
  );

  return JSON.parse(content);
};

export default UseSearchOverlayData;
