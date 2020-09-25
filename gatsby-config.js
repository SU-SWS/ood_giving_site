const path = require('path');

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Giving to Stanford`,
    description: `Giving to Stanford.`,
    author: `Stanford University Office of Development`,
    siteUrl: `https://giving-preview.stanford.edu`,
  },
  plugins: [
    `gatsby-plugin-canonical-urls`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' }
          { userAgent: '*', disallow: '/editor/' }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/editor/*`],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
        homeSlug: 'home',
        resolveRelations: [
          "oodQuoteSlider.quotes",
          "globalFooterPicker.globalFooter",
          "localFooterPicker.localFooter",
          "localHeaderPicker.localHeader",
          "contentMenuPicker.contentMenu",
        ],
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft'  // show only published on the front end site
        // version: 'draft'  // would show any including drafts
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [path.resolve(__dirname, 'node_modules')],
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
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
