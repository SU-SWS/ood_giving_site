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

```
cp example.env.development .env.development
nvm use
npm install
gatsby build
gatsby develop
```

Connecting to Storyblok
---

You will need an access token to connect to a storyblok space. Contact a member on the project team to get one. Once you have obtained a key you will need to add it to your local environment file. In `.env.development` and/or `.env.production` add the value of the access key to the `GATSBY_STORYBLOK_ACCESS_TOKEN` variable. 

Configuration
---

In order to access Storyblok you will need to get an access token. Once you have
a token you can add the value to your .env.development file.

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
