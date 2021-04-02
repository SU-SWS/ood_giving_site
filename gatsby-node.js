const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  return new Promise((resolve, reject) => {
    const storyblokEntry = path.resolve('src/templates/storyblok-entry.js')

    resolve(
      graphql(
        `{
          allStoryblokEntry {
            edges {
              node {
                id
                name
                created_at
                uuid
                slug
                full_slug
                content
                is_startpage
                parent_id
                group_id
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const entries = result.data.allStoryblokEntry.edges
        entries.forEach((entry, index) => {
          let slug = `${entry.node.full_slug}`

          slug = slug.replace(/^\/|\/$/g, '')
          let pagePath = entry.node.full_slug == 'home' ? '' : slug + '/'

          // Wire up the 404 page by setting the path to just 404 as Gatsby expects it.
          if (pagePath.match(/^404/)) {
            pagePath = "404"
          }

          // Wire up the 403 page by setting the path to just 403 as Gatsby expects it.
          if (pagePath.match(/^403/)) {
            pagePath = "403"
          }

          createPage({
            path: '/' + pagePath,
            component: storyblokEntry,
            context: {
              story: entry.node
            }
          })
        })
      })
    )

    resolve(
      graphql(
        `{
          allStoryblokEntry {
            edges {
              node {
                full_slug
                content
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const entries = result.data.allStoryblokEntry.edges
        entries.forEach((entry, index) => {
          let slug = `${entry.node.full_slug}`
          // Add Redirects pre-configured in Storyblok.
          if (slug.indexOf('global-components/redirects/') > -1) {
            const redirect = JSON.parse(entry.node.content);
            if (redirect && redirect.enabled) {
              createRedirect({
                fromPath: redirect.from,
                toPath: redirect.to,
                isPermanent: true,
                force: true,
                redirectInBrowser: true,
                statusCode: redirect.statusCode,
              })
            }
          }
        })
      })
    )
  })
}

// Alter Gatsby's webpack config.
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty"
    }
  })
}
