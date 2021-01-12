const query = `{
  pages: allStoryblokEntry(filter: {full_slug: {regex: "/^(?!(test-items/)|(global-components/))([a-z0-9]+)/"}, field_component: {ne: "storyOverview"}}) {
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
}`

function deepSearchByKey(object, originalKey, matches = []) {
  if (object != null) {
    if (Array.isArray(object)) {
      for (let arrayItem of object) {
        deepSearchByKey(arrayItem, originalKey, matches)
      }
    } else if (
      typeof object === "object" &&
      !Object.keys(object).includes("slug")
    ) {
      for (let key of Object.keys(object)) {
        if (key == originalKey) {
          matches.push(object[originalKey])
        } else {
          deepSearchByKey(object[key], originalKey, matches)
        }
      }
    }
  }

  return matches
}

const MAX_TEXT_LENGTH_PER_RECORD = 500

const queries = [
  {
    query,
    transformer: ({ data }) => {
      const nestedNodes = data.pages.nodes.map(({ content, ...node }) => {
        let description
        let textContent = []
        try {
          const parsed = JSON.parse(content)

          // also index seo description
          description = parsed.seo.description

          // parse text context of each page from node.content
          const contentKeys = ["storyContent", "pageContent"]
          contentKeys.forEach(key => {
            if (Array.isArray(parsed[key])) {
              parsed[key].forEach(pagePart => {
                deepSearchByKey(pagePart, "text", textContent)
              })
            }
          })
        } catch (error) {
          console.error(
            `Failed to parse SEO description and text content from content JSON`,
            error
          )
          description = null
        }

        // concatenate text content items, so that they are not too short
        let concatContent = []
        let canBeConcatenated = false
        for (let idx = 0; idx < textContent.length; idx++) {
          const current = textContent[idx]
          if (!canBeConcatenated) {
            concatContent.push(current)
          } else if (canBeConcatenated) {
            let latest = concatContent[concatContent.length - 1]
            // add a white space if necessary
            if (!latest.endsWith(" ") && !current.startsWith(" ")) {
              latest = `${latest} `
            }
            concatContent[concatContent.length - 1] = latest.concat(current)
          }

          canBeConcatenated =
            concatContent[concatContent.length - 1].length <
            MAX_TEXT_LENGTH_PER_RECORD
        }

        // even when NO text content is found, index all other information
        if (!concatContent.length) {
          return [{ description, ...node, text: null }]
        }

        // when text content is found, we want to index every single (concatenated) paragraph as a record
        // we can then collate the records by matching their IDs / slugs in Algolia
        return concatContent.map((paragraph, idx) => ({
          description,
          ...node,
          objectID: `${node.objectID}-${idx}`,
          text: paragraph,
        }))
      })

      return nestedNodes.flat()
    },
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    enablePartialUpdates: true,
    // matchFields: ["slug", "modified"],
    settings: {
      distinct: true,
      attributeForDistinct: "slug",
    },
  },
]

module.exports = queries
