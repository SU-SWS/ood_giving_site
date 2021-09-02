# [ADAPT OOD GIVING](https://github.com/SU-SWS/ood_giving_site)
##### Version: 1.0.0

[![Netlify Status](https://api.netlify.com/api/v1/badges/b539dff9-d21b-4a2e-8edc-b9cb898c26b2/deploy-status)](https://app.netlify.com/sites/adapt-giving/deploys)

Changelog: [Changelog.md](CHANGELOG.md)

Description
---

Netlify hosted, Gatsby built, storyblok headless cms site for giving.stanford.edu


Installation
---

*Development*
```
cp example.env.development .env.development
* Manually add the access token to .env.development *
nvm use
npm install
gatsby develop
```

*Production*
```
cp example.env.development .env.production
* Manually add the access token to .env.production *
nvm use
npm install
gatsby build
```

Connecting to Storyblok
---

You will need an access token to connect to a storyblok space. Contact a member on the project team to get one. Once you have obtained a key you will need to add it to your local environment file. In `.env.development` and/or `.env.production` add the value of the access key to the `GATSBY_STORYBLOK_ACCESS_TOKEN` variable. `Development` builds can use the `preview` access tokens from Storyblok, but `Production` builds should only ever use the `public` access tokens. This is to ensure no unpublished content is accidentally revealed to the public.

Connecting to Algolia
---

The content of this site is indexed with Algolia. When the search is used, Algolia is queried by the frontend for results. In order to do that, the frontend needs several environment variables: 

* `GATSBY_ALGOLIA_APP_ID`,
* `GATSBY_ALGOLIA_SEARCH_API_KEY`,
* `GATSBY_ALGOLIA_INDEX_NAME` and
* `GATSBY_ALGOLIA_SUGGESTIONS_INDEX_NAME`.

Set these in your `.env.development`/`.env.production` files in order for the search to work. 

When building a production build, the Algolia index is also rebuilt, if and only if the environment variable `NETLIFY` is set to `true`. This is so local test builds do not trigger a index rebuild. The re-indexing needs an additional environment variable - the private Algolia admin API key `ALGOLIA_ADMIN_KEY`.

Development vs Production builds.
---

This project makes use of the NODE_ENV environment variable to run different builds. We also use `.env.*` files to pass through configuration options.

Troubleshooting
---

If you are experiencing issues with this module try reverting the feature first. If you are still experiencing issues try posting an issue on the GitHub issues page.

Developer
---

### Preview environment
- How to.

### Production deployment
- How to.

Contribution / Collaboration
---

You are welcome to contribute functionality, bug fixes, or documentation to this module. If you would like to suggest a fix or new functionality you may add a new issue to the GitHub issue queue or you may fork this repository and submit a pull request. For more help please see [GitHub's article on fork, branch, and pull requests](https://help.github.com/articles/using-pull-requests)

### Component Organization in This Repo

#### Partials

Deciding when a component belongs in the Partials folder: This folder includes components that represent part of a page,
like 'Below Content' or 'Footer'. 'Below content' could belong to just one page-type component, or it could be used by several.
The Footer component is a partial because it is included into each page-type component. The footer component includes
the local and global footer (with settings) and places them on the page.

#### View Modes for Components

When a certain component type has multiple "view modes", like a full-page view mode and a card or feature view mode,
then it should have several components associated with it. Here are a few standards about this approach:

PrimaryComponent: should have the switch logic to include the view mode components
Example viewmode components: PrimaryComponentFullView  PrimaryComponentCardView  PrimaryComponentTeaserView

* Each "viewmode" component should be in it's own component file.
* These "viewmode" components should end with 'View' so it's like OodInteriorPageCardView or OodInteriorPageView, and contain the type of viewmode: like 'Full' 'Card' or 'Feature'.
We use 'Full' instead of 'Page' for the full page viewmode because some component types include the word 'page' in their name already.
For example, "OodInteriorPageFullView" and "OodInteriorPageCardView"
