# 11. Use direct Storyblok webhooks to sync stories with Algolia

Date: 2026-05-26

## Status

Accepted

## Supersedes

- [0004. Use Storyblok plugin to sync stories with Algolia](./0004-use-storyblok-plugin-to-sync-stories-with-algolia.md)

## Context

The Storyblok → Algolia plugin + Algolia connector pipeline no longer provides the reliability and control required for search indexing.

We need a deterministic, in-repo indexing flow that:

- reacts directly to Storyblok content events,
- can enforce strict signature validation,
- handles move/unpublish/delete scenarios correctly,
- and maintains both the primary and suggestions indexes consistently.

## Decision

We will replace the external connector pipeline with a webhook-driven indexing flow implemented in this repository.

### Triggering

- Storyblok sends webhook events to `netlify/functions/storyblok-webhook.mts`.
- Supported actions: `story.published`, `story.unpublished`, `story.deleted`, `story.moved`.

### Security

- Requests are validated using `webhook-signature` and `STORYBLOK_WEBHOOK_SECRET`.
- Invalid signatures are rejected with HTTP `403`.

### Processing

- The webhook returns quickly (`200`) after validation and schedules indexing asynchronously.
- For indexable events, the site fetches the canonical published Storyblok story.
- A local transform utility flattens content into the existing `processed` search shape.
- Excluded slugs are filtered and removed from Algolia when necessary.

### Index Targets

- Main index default: `Giving To Stanford (ISR)`
- Suggestions index default: `g2s_isr_query_suggestions`

Both defaults may be overridden via environment variables.

### Deployment Hook

- `netlify/functions/deploy-succeeded.mts` is retained as a no-op compatibility hook.
- Deploy events no longer trigger Algolia ingestion tasks.

## Consequences

### Positive

- We own and version all indexing logic in this repository.
- Behavior for publish/unpublish/delete/move is explicit and testable.
- Suggestions index consistency is guaranteed by the same code path.
- Operational dependency on external connector processing is removed.

### Tradeoffs / Risks

- We now own webhook validation and indexing error handling.
- Reliability depends on function availability and webhook delivery.
- Additional monitoring/alerting should be maintained for indexing failures.

## Related Files

- `netlify/functions/storyblok-webhook.mts`
- `utilities/algolia/indexStory.ts`
- `utilities/algolia/transformStoryblokRecord.ts`
- `utilities/algolia/types.ts`
