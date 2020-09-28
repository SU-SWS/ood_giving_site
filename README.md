# [ADAPT OOD GIVING](https://github.com/SU-SWS/ood_giving_site)
##### Version: 1.0.0

<a href="https://codeclimate.com/repos/5f6cf2ceafd47c7359000865/maintainability"><img src="https://api.codeclimate.com/v1/badges/681fbc135f73271ae120/maintainability" /></a>

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
