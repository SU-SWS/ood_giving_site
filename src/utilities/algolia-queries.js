const escapeStringRegexp = require("escape-string-regexp")

const indexName = `Giving to Stanford`

const query = `{
  pages: allStoryblokEntry(filter: {full_slug: {regex: "/^(?!(test-items/)|(global-components/))([a-z0-9]+)/"}, field_component: {ne: "storyOverview"}}) {
    edges {
      node {
        objectID: id
        uuid
        full_slug
        name
        # internalId
        # path
        slug
        content
        field_component
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

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
      data.pages.edges.map(({ node }) => {
        if (node.uuid === "1e78fb17-5835-40d0-a768-89650a5fc4d9") {
          const fs = require("fs")
          console.log("1e78fb17-5835-40d0-a768-89650a5fc4d9")
          if (node.content) {
            const blokObj = JSON.parse(node.content)
            const retObj = deepSearchByKey(blokObj, "text")
            // node.content = retObj
            console.log('node["full_slug"]', node["full_slug"])
            fs.writeFile(
              `/Users/artur/Development/REPLY/Stanford/ood_giving_site/${node["slug"]}.json`,
              node.content.toString(),
              function (err, data) {
                if (err) {
                  return console.log(err)
                }
                console.log(data)
              }
            )
          }
        }
        return node
      }), // optional
    indexName,
    enablePartialUpdates: true,
    chunkSize: 250000,
    // settings: { attributesToSnippet: [`excerpt:20`], },
    // matchFields: ["slug", "modified"],
  },
]

module.exports = queries
