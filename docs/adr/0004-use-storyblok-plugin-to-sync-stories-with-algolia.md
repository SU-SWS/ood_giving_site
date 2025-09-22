# 4. Use Storyblok plugin to sync stories with Algolia

Date: 2025-07-14

## Status

Accepted

## Context

We need to sync Storyblok stories to Algolia to power the site search.

## Decision

We will use the Storyblok Algolia plugin to push all stories into Algolia. This runs automatically whenever any story is published/edited/deleted.

We will also use the Algolia index connector to regularly process the data in Algolia to remove any non-public stories and flatten needed content data. This connector ingests all the items in the index, passes them through a custom transformation function, then re-inserts any updated items. Our transformation function will hide any stories that shouldn't be public based on full slug (e.g. everything in /global-components) and will pull out and flatten into a "processed" object any content needed for the site search (e.g. title, description, story text content, etc.). 

The Algolia index connector task will be triggered after every successful production deployment through a Netlify function (netlify/functions/deploy-succeeded.mts). This will ensure that any Storyblok content edits that trigger a build in production will also trigger a data processing task in Algolia *after* that data is pushed to Algolia.

See:
- [Storyblok Algolia plugin](https://www.storyblok.com/apps/storyblok-gmbh@algolia)
- [Transforming your data with code in Algolia](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/transform-your-data/)
- [Trigger function on events in Netlify](https://docs.netlify.com/functions/trigger-on-events/)

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

This allows for content updates to seemlessly sync with Algolia. It does introduce outside dependencies (Storyblok's Algolia plugin and Algolia's index connector) which may change or break in the future though.
