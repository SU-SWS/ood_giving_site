# ADR 0010: Storyblok Rate Limiting Strategy

## Status
Accepted

## Date
2025-12-17

## Context
The Next.js build process uses `experimental.cpus: 10` to parallelize static page generation. This spawns 10 worker processes, each initializing its own Storyblok client.
The Storyblok Content API has a rate limit of approximately 60 requests per second.
Previously, the `rateLimit` in `utilities/storyblok.tsx` was set to 6 RPS per client.
With 10 workers, the total potential throughput was 60 RPS (10 * 6), which is right at the edge of the API limit.
This caused "Hit rate limit" errors and build hangs due to excessive retries and backoff during the "thundering herd" of requests from parallel workers.

## Decision
We have reduced the `rateLimit` in `utilities/storyblok.tsx` from 6 RPS to 3 RPS.
We have also reduced the `experimental.cpus` in `next.config.ts` from 10 to 4.

## Consequences
- **Stability**: The total potential throughput is now 12 RPS (4 workers * 3 RPS), which provides a very safe buffer below the ~60 RPS API limit.
- **Resource Usage**: Reducing the worker count from 10 to 4 significantly lowers the memory and CPU pressure on the Netlify build environment, preventing hangs caused by resource exhaustion.
- **Performance**: While fewer workers means less parallelism, the stability gain outweighs the theoretical speedup. A successful slower build is better than a hanging fast one.
- **Reliability**: Builds should no longer hang or fail due to Storyblok API rate limiting or resource exhaustion.

## Implementation
Modified `utilities/storyblok.tsx`:
```typescript
    apiOptions: {
      // Rate limiting: 3 RPS is safe with 10-15 build threads (30-45 RPS total)
      rateLimit: 3,
      // ...
    },
```

Modified `next.config.ts`:
```typescript
  experimental: {
    cpus: 4,
  },
```
