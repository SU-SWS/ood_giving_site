# 2. Use Next redirect functionality to support redirects

Date: 2025-05-07

## Status

Accepted

## Context

Editors within Storyblok should be able to create redirects as needed.

## Decision

Redirect stories can be created within a specific `global-components/redirects` directory within the Storyblok space. These will render an informational Redirect component within the Storyblok preview. During build-time we will use a utility function (`getStoryblokRedirects`) to fetch all the redirect stories and feed them into the [built-in Next.js configuration redirect array](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects). [Netlify supports Next.js redirects](https://docs.netlify.com/frameworks/next-js/overview/).

## Consequences

Editors will be empowered to create their own redirects through the provided process.
