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
    } else if (typeof object == "object") {
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

const queries = [
  {
    query,
    transformer: ({ data }) =>
      data.pages.nodes.map(({ content, ...node }) => {
        // TODO: parse text context of each page from node.content and index as attribute
        // For now, we ignore the content property
        let description

        try {
          const parsed = JSON.parse(content)
          description = parsed.seo.description
        } catch (error) {
          console.error(
            `Failed to parse SEO description from content JSON`,
            error
          )
          description = null
        }

        return { description, ...node }
      }),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    enablePartialUpdates: true,
    // settings: { attributesToSnippet: [`excerpt:20`], },
    // matchFields: ["slug", "modified"],
  },
]

module.exports = queries
