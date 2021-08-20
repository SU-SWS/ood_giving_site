/** All Algolia index related code is in this file. Used in the plugin config in gatsby-config.js */

/** This is the query we use to find all pages relevant for thea Algoli index.
 *
 * All /test-items/ and /global-components/ pages are filtered out, as these do not belong in the index.
 */
const query = `{
  pages: allStoryblokEntry(filter: {full_slug: {regex: "/^(?!(test-items/)|^(404|403)|(global-components/))([a-z0-9]+)/"}, field_component: {ne: "storyOverview"}, field_noindex_boolean: { ne: true } }) {
    nodes {
      objectID: id
      slug: full_slug
      title: field_title_string
      author: field_author_string
      shortTitle: field_shortTitle_string
      intro: field_intro_string
      teaser: field_teaser_string
      publishedAt: published_at
      pageType: field_component
      content
    }
  }
}`;

// Searches a nested object for a specific key and returns all matched values
function deepSearchByKeys(object, searchKeys, matches = []) {
  if (object !== null) {
    if (Array.isArray(object)) {
      for (let arrayItem of object) {
        deepSearchByKeys(arrayItem, searchKeys, matches);
      }
    } else if (
      typeof object === "object" &&
      !Object.keys(object).includes("slug")
    ) {
      for (let key of Object.keys(object)) {
        if (searchKeys.includes(key) && typeof object[key] === "string") {
          matches.push(object[key]);
        } else if (typeof object[key] === "object") {
          deepSearchByKeys(object[key], searchKeys, matches);
        }
      }
    }
  }

  return matches;
}

const MAX_TEXT_LENGTH_PER_RECORD = 500;

const queries = [
  {
    query,
    transformer: ({ data }) => {
      /** Because the gatsby storyblok source plugin unfortunately returns the plain-text content of the pages
       * inside a nested JSON structure, in this transformer we map over all pages and try to extract all relevant
       * plain text inside the JSON.
       */
      const nestedNodes = data.pages.nodes.map(({ content, ...node }) => {
        let description;
        let textContent = [];
        try {
          const parsed = JSON.parse(content);

          // also index seo description
          description = parsed.seo.description;

          // These contentKeys are the JSON properties in which relevant plain-text content resides in
          // Might need to be updated, should the storyblok schema of the page type components change
          const contentKeys = [
            "storyContent",
            "pageContent",
            "aboveContent",
            "belowContent",
            "sections",
          ];

          // These textKeys are the JSON properties that contain the actual text strings that we want to index
          // These also might need to be changed / added to based on changes to the storyblok schema
          const textKeys = ["text", "headline"];
          contentKeys.forEach((key) => {
            // parse text context of each page from node.content
            if (Array.isArray(parsed[key])) {
              parsed[key].forEach((pagePart) => {
                deepSearchByKeys(pagePart, textKeys, textContent);
              });
            }
          });
        } catch (error) {
          console.error(
            `Failed to parse SEO description and text content from content JSON`,
            error
          );
          description = null;
        }

        // concatenate text content items, so that they are not too short
        let concatContent = [];
        let canBeConcatenated = false;
        for (let idx = 0; idx < textContent.length; idx++) {
          const current = textContent[idx];
          if (!canBeConcatenated) {
            concatContent.push(current);
          } else if (canBeConcatenated) {
            let latest = concatContent[concatContent.length - 1];
            // add a white space if necessary
            if (!latest.endsWith(" ") && !current.startsWith(" ")) {
              latest = `${latest} `;
            }
            concatContent[concatContent.length - 1] = latest.concat(current);
          }

          canBeConcatenated =
            concatContent[concatContent.length - 1].length <
            MAX_TEXT_LENGTH_PER_RECORD;
        }

        // even when NO text content is found, index all other information
        if (!concatContent.length) {
          return [{ description, ...node, text: null }];
        }

        // when text content is found, we want to index every single (concatenated) paragraph as a record
        // we can then collate the records by matching their IDs / slugs in Algolia
        return concatContent.map((paragraph, idx) => ({
          description,
          ...node,
          objectID: `${node.objectID}-${idx}`,
          text: paragraph,
        }));
      });

      return nestedNodes.flat();
    },
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    enablePartialUpdates: true,
    // matchFields: ["slug", "modified"],
    settings: {
      // These two settings allow multiple records to be collated. Because we are indexing plain-text content
      // and that content might be too big for a single record, we index each paragraph as a single record
      // and then collate these records by their slug property.
      distinct: true,
      attributeForDistinct: "slug",
      // These configure which record attributes are searched and also give them a priority
      // Priority is ranked from top to bottom: most important first
      searchableAttributes: [
        "title",
        "shortTitle",
        "slug",
        "author",
        "intro,description,teaser",
        "text",
      ],
    },
  },
];

module.exports = queries;
