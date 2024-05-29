const path = require('path');

require('dotenv').config();

// Support for Gatsby CLI
let siteUrl = 'http://localhost:8000';

// Support for Production site builds.
if (process.env.CONTEXT === 'production') {
  siteUrl = process.env.URL;
}
// Support for non-production netlify builds (branch/preview)
else if (process.env.CONTEXT !== 'production' && process.env.NETLIFY) {
  siteUrl = process.env.DEPLOY_PRIME_URL;
}
// Support for Netlify CLI.
else if (process.env.NETLIFY_DEV === true) {
  siteUrl = 'http://localhost:64946';
}

/**
 * Resolve relations for storyblok.
 */
const storyblokRelations = [
  'oodQuoteSlider.quotes',
  'globalFooterPicker.globalFooter',
  'localFooterPicker.localFooter',
  'localHeaderPicker.localHeader',
  'contentMenuPicker.contentMenu',
  'storyPicker.story',
  'alertPicker.alert',
  'endowedPositionsSearchPicker.endowedPositionsSearch',
  'countdownPicker.countdown',
];

module.exports = {
  siteMetadata: {
    title: `Giving to Stanford`,
    description: `Giving to Stanford.`,
    author: `Stanford University Office of Development`,
    siteUrl,
    // This key is for metadata only and can be statically queried
    storyblok: {
      resolveRelations: storyblokRelations,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: '/editor/' },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5RGQ5DD',

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
                pageContext
              }
            }
          }
        }
        `,
        resolvePages: ({ allSitePage: { edges: allPages } }) => {
          return allPages.map((page) => {
            return { ...page.node };
          });
        },
        resolveSiteUrl: () => siteUrl,
        excludes: [
          '/editor',
          '/editor/**',
          '/global-components/**',
          '/test-items/**',
          '/403',
        ],
        // eslint-disable-next-line consistent-return
        filterPages: (page, excludedRoute, tools) => {
          // Return true excludes the path, false keeps it.
          if (
            // Exclude non-canonical pages.
            !page.pageContext.isCanonical ||
            // Exclude pages marked with "noindex"
            page.pageContext.noindex ||
            // Exclude pages that match the "excludes" array. (default condition)
            tools.minimatch(
              tools.withoutTrailingSlash(tools.resolvePagePath(page)),
              tools.withoutTrailingSlash(excludedRoute)
            )
          ) {
            return true;
          }
        },
      },
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
        homeSlug: 'home',
        resolveRelations: storyblokRelations,
        resolveLinks: 'url',
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft', // show only published on the front end site
        // version: 'draft'  // would show any including drafts
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'node_modules')],
        },
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Giving to Stanford`,
        start_url: `/`,
        include_favicon: false,
        crossOrigin: `use-credentials`,
        icons: [],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        // enablePartialUpdates: true,
        queries: require('./src/utilities/algoliaQueries'),
        // we skip the indexing completely on non-prod builds.
        skipIndexing: !!(
          process.env.ALGOLIA_SKIP_INDEXING === 'true' ||
          process.env.CONTEXT !== 'production'
        ),
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: false,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/constants/`,
      },
    },
  ],
};
