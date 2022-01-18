# [ADAPT OOD GIVING](https://github.com/SU-SWS/ood_giving_site)
##### Version: 1.0.0

<a href="https://codeclimate.com/github/SU-SWS/ood_giving_site/maintainability"><img src="https://api.codeclimate.com/v1/badges/dc1a243d09f8aa5c903a/maintainability" /></a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/b539dff9-d21b-4a2e-8edc-b9cb898c26b2/deploy-status)](https://app.netlify.com/sites/adapt-giving/deploys)

Changelog: [Changelog.md](CHANGELOG.md)

Description
---

Netlify hosted, Gatsby built, storyblok headless cms site for giving.stanford.edu

## Installation

_Development_

```
cp example.env .env
* Manually add the vault secret and role id to .env
* You can get the variables by running `netlify login` then `netlify link` and then `netlify env`
* After the VAULT_ROLE_ID and VAULT_SECRET_ID environment variables have been set run
npm run vault
* Then fire up your development server using gatsby
npm run dev
* Or a netlify development server
netlify dev
```

## Connecting to Storyblok

You will need an access token to connect to a storyblok space. You can contact a member on the project team to get one but if you follow the installation steps you should be able to get one from vault. `Development` builds can use the `preview` access tokens from Storyblok, but `Production` builds should only ever use the `public` access tokens. This is to ensure no unpublished content is accidentally revealed to the public. By default the environment variables from vault are set to point to the development environment and then overridden with the contextual environment plugin. For local development, you can override any of the environment variables as the netlify build plugins don't take effect when running netlify dev.

## Development vs Production builds.

This project makes use of the NODE_ENV environment variable to run different builds. We also use `.env` files to pass through configuration options which are then transformed by netlify plugins. By default the environment variables from vault are set to point to the development environment and then overridden with the contextual environment plugin. For local development, you can override any of the environment variables as the netlify build plugins don't take effect when running netlify dev.

## Connecting to Netlify

You will need to be added to the Stanford ADAPT Team Netlify account. Contact a memeber on the team to receive access. Once you have been invited to the Team Netlify account, you will need to link your local enviroment.

If you do not have Netlify CLI locally setup, you will want to run the following command within your terminal:

```
npm install netlify-cli -g
```

Once Netlify CLI has been installed, you will want to log into your Netlify account:

```
netlify login
```

You'll be prompted to sign into your Netlify account and authorize your local Netlify CLI.

Then you can link your local project repository to Netlify by running:

```
netlify link
```

You will be prompted to select from four options. You will want to select the option:

```
> Use current git remote origin (https://github.com/SU-SWS/ood_giving_site)
```

Once your local has been successfully link to Netlify, you can run the following command to streamline your local development experience:

```
netlify dev
```

Encountering issues with setup? Please refer to the [official Netlify CLI documentation](https://docs.netlify.com/cli/get-started/#netlify-dev) for further asssitance.

## Troubleshooting

If you are experiencing issues with this module try reverting the feature first. If you are still experiencing issues try posting an issue on the GitHub issues page.

## Environment Variables

Environment variable file: `.env`
We are no longer using `production` and `development` environment variable files. We use the [netlify-plugin-contextual-env](https://www.npmjs.com/package/netlify-plugin-contextual-env) plugin to support different environments. See below for more.

*Netlify-plugin-contextual-env*
We use this plugin to set the environment variables in the various different environments. See [the plugin page](https://www.npmjs.com/package/netlify-plugin-contextual-env) for a full set of configuration options. We are use the `prefix` option to separate out the different configuration.

## Contextual Environment Variables in LAMBDA functions
The contextual-env plugin from Netlify runs on build time and does not provide runtime support for LAMBDA functions. To get those to work we have to add an additional plugin that inlines the values of the environment variables into your LAMBDA functions.

See: [netlify-plugin-inline-functions-env](https://www.npmjs.com/package/netlify-plugin-inline-functions-env)

Prefix strategy
A non-prefixed version has to exist in order for the plugin to work. For example, GATSBY_TOKEN has to exist in order for DEPLOY_PREVIEW_GATSBY_TOKEN to work. The non-prefixed version of the environment variable is the default and then overridden with the plugin at build time. The default tokens should all point to the development environments so that branch deployes, dev environments, and build previews all use that token. We then use the `PROD_` prefix to override the production environment builds.

## Environment Variables on Netlify

Netlify should support only a minimal amount of environment variables in their UI. VAULT_ROLE_ID and VAULT_SECRET are required but all other environment variables should go into either a global folder or into the project specific folder.

The project specific folder for this website is `secret/data/projects/adapt/giving`

As environment variables get contextualized through plugins, there is no need to separate out dev/prod variables into separate folders.

## Vault

Vault source paths:
- 'secret/data/projects/adapt/giving'
- 'secret/data/projects/adapt/certs'

Environment variables are stored (and versioned) in vault.stanford.edu. You can fetch them and have them written to `.env` by running `npm run vault`. You will need to add the vault role id and vault secret into the `.env` file first. You can likely find those values in the Netlify environment variables UI. If you can't find them. Please ask another developer.

The script that fetches the secrets is in the netlify plugin 'plugins/netlify-plugin-vault-variables/script.js'. It is exectued by running `npm run vault`.

When the script runs, it should only append new values to your `.env` file. This means you can have your own local environment variables or overwrite ones that are coming from vault. You can change this so that vault overwrite all values by setting the environment variable VAULT_OVERWRITE=true.

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

## Development Workflows

All general development work should be based off of the `dev` branch.
Branches should abide by the following branch name format: `{branch-type}/JIRA-###_optional-description-of-task`
where `branch-type` is `feature/`, `task/`, or `bug/` and `JIRA-###` corresponds with the Jira ticket number.
This will ensure that features get labeled and organized correctly in the release and connect to Jira appropriately.

- Create branch from `dev` following the above outlined branch naming conventions.
- Complete work in your branch.
- Create a pull request from your branch into `dev` branch. This will deploy a Netlify preview for your branch.
- On PR approval, **squash merge** your branch with the following merge commit message format: `JIRA-### | Brief description of work completed`.

Pull requests against dev will need to pass status checks for the following:
- lint
- test
- codeclimate
- Branch up to date with `dev`
- Netlify build/deploy preview

Pull requests merged into dev will kickoff a Netlify branch deploy for the `dev` branch.

## Release Workflow

To release code to production you will need to create a release branch from `dev` and make a pull request to `main`.
Including semver tags (`[major]`, `[minor]`, `[patch]`) will automatically add a semver label to the PR which will
determine how to increment semver during release. If no label is provided it will default to `patch`.

- Create branch from `dev` (or commit ref from `dev`) with `release/` prefix and optional semver tag (e.g. `release/completely-refactor-everything[major]`)
- Create a pull request from your `release/my-cool-release` branch into `main`
- On PR approval, do a standard **merge commit** into `main`

Merges to `main` will kickoff the following tasks:
- Semver version bump
- Publish github release
- Netlify production build and deploy
- Merge changes back into `dev`

## Hotfix Workflow

Hotfix workflows should only ever be used when there is a production bug that needs immediate attention and
there are changes in `dev` that are not ready for deployment.

- Create a `hotfix/` branch from `main`
- Complete the fix in your branch
- Create a pull request from your hotfix branch into `main`
- On PR approval, **squash merge** your branch with the following merge commit message format: `JIRA-### | Brief description of hotfix`.

Depending on the nature your hotfix and the history of `dev` you may need to to manually merge `main` back into `dev` to resolve merge conflicts.
