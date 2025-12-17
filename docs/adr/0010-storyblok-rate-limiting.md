# ADR 0010: Storyblok Rate Limiting Strategy

## Status
Accepted

## Date
2025-12-17

## Context
The Next.js build process uses `experimental.cpus: 10` to parallelize static page generation. This spawns 10 worker processes, each initializing its own Storyblok client.
The Storyblok Content API has a rate limit (typically around 50-60 requests per second).
Previously, the `rateLimit` in `utilities/storyblok.tsx` was set to 6 RPS per client.
With 10 workers, the total potential throughput was 60 RPS (10 * 6), which is right at the edge of the API limit.
This caused "Hit rate limit" errors and build hangs due to excessive retries and backoff during the "thundering herd" of requests from parallel workers.

## Decision
We have reduced the `rateLimit` in `utilities/storyblok.tsx` from 6 RPS to 3 RPS.

## Consequences
- **Stability**: The total potential throughput is now 30 RPS (10 workers * 3 RPS), which provides a safe buffer below the ~60 RPS API limit.
- **Performance**: Individual workers are throttled more aggressively, which might slightly increase the build time per page if a single page requires many requests. However, since we have 10 workers running in parallel, the overall build time should remain acceptable and, more importantly, reliable.
- **Reliability**: Builds should no longer hang or fail due to Storyblok API rate limiting.

## Implementation
Modified `utilities/storyblok.tsx`:
```typescript
    apiOptions: {
      // Rate limiting: 3 RPS is safe with 10-15 build threads (30-45 RPS total)
      rateLimit: 3,
      // ...
    },
```
