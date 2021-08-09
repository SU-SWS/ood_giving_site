const path = require("path");

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

console.log(`Using environment config: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

/**
 * Resolve relations for storyblok.
 */
const storyblokRelations = [
  "oodQuoteSlider.quotes",
  "globalFooterPicker.globalFooter",
  "localFooterPicker.localFooter",
  "localHeaderPicker.localHeader",
  "contentMenuPicker.contentMenu",
  "storyPicker.story",
  "alertPicker.alert",
];

module.exports = {
  siteMetadata: {
    title: `Giving to Stanford`,
    description: `Giving to Stanford.`,
    author: `Stanford University Office of Development`,
    siteUrl: `https://giving-dev.netlify.app`,
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
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: "https://giving-dev.netlify.app",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          { userAgent: "*", allow: "/" },
          { userAgent: "*", disallow: "/editor/" },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-5RGQ5DD",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
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
          allSitePage(filter: {context: {isCanonical: {eq: true}}}) {
            edges {
              node {
                path
                context {
                  isCanonical
                }
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
        resolveSiteUrl: () => "https://giving-dev.netlify.app",
        excludes: [
          "/editor",
          "/editor/**",
          "/global-components/**",
          "/test-items/**",
          "/403",
        ],
      },
    },
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
        homeSlug: "home",
        resolveRelations: storyblokRelations,
        version: process.env.NODE_ENV == "production" ? "published" : "draft", // show only published on the front end site
        // version: 'draft'  // would show any including drafts
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("node-sass"),
        sassOptions: {
          includePaths: [path.resolve(__dirname, "node_modules")],
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
        queries: require("./src/utilities/algoliaQueries"),
        // we skip the indexing completely on non-prod builds.
        skipIndexing: true,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: false,
      },
    },
  ],
};
