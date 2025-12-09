# ADR 0008: Next.js 16 Caching Strategy for Storyblok

**Date**: 2025-12-03  
**Status**: Accepted (Updated 2025-12-04)  
**Supersedes**: Previous `unstable_cache` and React `cache` implementations

## Context

Following the [Next.js 16 upgrade (ADR 0007)](./0007-next-js-16-upgrade.md), we optimized our Storyblok content caching strategy while maintaining our static-first approach with webhook-triggered rebuilds on Netlify.

### Current Architecture
- **341 static pages** generated via `generateStaticParams`
- **Webhook-triggered full rebuilds** on Storyblok content changes
- **Atomic deployments** on Netlify with 1-year edge caching
- **Separate dev/prod Storyblok spaces** for environment isolation
- **Storyblok visual editor** requires draft content access

## Decision

### 1. Migrate to `use cache` Directive

**Action**: Replace React's `cache` wrapper with Next.js 16's `'use cache'` directive.

**Implementation**:
```typescript
// utilities/data/getStoryData.ts
export const getStoryData = async ({ path }: getStoryDataProps): Promise<ISbResult | { data: 404 }> => {
  'use cache';
  
  const storyblokApi = getStoryblokClient();
  // ... rest of function
};
```

**Key Changes**:
- Enabled `cacheComponents: true` in `next.config.ts`
- Added `'use cache'` directive at the start of async data functions
- Removed wrapper functions (e.g., `getStoryDataCached`)
- Functions are now called directly (e.g., `getStoryData()` instead of `getStoryDataCached()`)

**Benefits**:
- Uses Next.js 16's official Cache Components feature
- Automatic cache key generation from function arguments
- Simplified API - no wrapper functions needed
- Cache entries respect default `cacheLife` profile (5min stale, 15min revalidate)
- Each build process gets fresh cache automatically
- Works seamlessly with Storyblok SDK's built-in caching

### 2. Simplified Caching Strategy with `use cache` and Storyblok SDK

**Action**: Use `'use cache'` directive for build-time deduplication; configure Storyblok SDK for optimal performance.

**How It Works**:
1. **Next.js `use cache` directive**: Deduplicates identical function calls with automatic cache management
2. **Storyblok SDK memory cache**: Reduces redundant API calls during build process
3. **Next.js 16 build isolation**: Each new build process starts fresh
4. **Webhook triggers**: New build = fresh cache = latest content

**Rationale**:
- Leverages Next.js 16's official caching mechanism
- Storyblok SDK provides built-in caching capabilities
- Automatic fresh content per build (no manual cache busting needed)
- Rate limiting prevents API errors during parallel page generation

### 3. Version Strategy

**Implemented Separation**:

| Context | Version | Implementation | Cache Behavior |
|---------|---------|----------------|----------------|
| **Production Build** | `published` | All `utilities/data/` functions | Fresh fetch per build, deduplicated |
| **Visual Editor** | `draft` | `EditorClient.tsx` (client-side) | No caching, always fresh |
| **Local Development** | `published` | Same as production | Fresh fetch per build |

**Documentation**: Added comprehensive JSDoc comments to all data fetching utilities explaining:
- Version strategy (published vs draft)
- Caching strategy (`use cache` directive)
- Build-time behavior vs runtime editor behavior

### 4. Maintain Static-First with Full Rebuilds

**Decision**: Continue webhook-triggered full site rebuilds; **do not implement ISR** at this time.

**Rationale**:
- **Simplicity**: Full rebuilds are straightforward and robust
- **Consistency**: Guarantees all pages reflect same content version
- **Scale**: 341 pages is manageable for full rebuilds
- **Netlify Integration**: Atomic deployments work perfectly with this model
- **Accessibility**: Global accessibility fixes propagate universally

**Trigger for Re-evaluation**: Consider ISR only if:
- Build times consistently exceed 15-20 minutes
- Site grows to thousands of pages
- Editors require near-instant content updates

### 5. Worker Concurrency Limit

**Action**: Configure `experimental.cpus: 10` in `next.config.ts` to prevent race conditions.

**Implementation**:
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    cpus: 10,
    // ... other config
  },
  // ... rest of config
};
```

**Rationale**:
- **Race Condition Prevention**: High parallelism (31 workers on Netlify) with `use cache` directive caused builds to hang consistently at page 257/343
- **Optimal Performance**: 10 workers balances build speed with cache stability
- **Next.js Native**: Uses proper Next.js configuration via `experimental.cpus` (not environment variables)
- **Build Reliability**: Prevents cache corruption from concurrent writes

**How It Works**:
- Next.js `getNumberOfWorkers()` function reads `config.experimental.cpus`
- Defaults to 4 workers if not specified
- Limits parallelism during `generateStaticParams` and page generation
- Each worker maintains isolated cache state

**Note**: The `NEXT_CPU_COUNT` environment variable is NOT used by Next.js 16. Use `experimental.cpus` in config instead.

### 6. Enhanced Documentation

**Action**: Added comprehensive documentation across caching-related code:

- `utilities/data/*.ts` - JSDoc with version and caching strategies
- `utilities/storyblok.tsx` - Storyblok SDK configuration documentation
- `AGENTS.md` - Updated architecture patterns with worker concurrency info
- `README.md` - Updated with Next.js 16 caching approach (pending)

## Consequences

### Positive

✅ **Official API**: Uses Next.js 16's stable `use cache` directive  
✅ **Simplified Code**: No wrapper functions needed - direct function calls  
✅ **Build Performance**: Automatic deduplication reduces redundant API calls  
✅ **Rate Limiting**: SDK rate limiting (6 RPS) prevents API errors during parallel builds  
✅ **Content Freshness**: Each build gets fresh content from Storyblok  
✅ **Automatic Cache Keys**: No manual cache key management needed  
✅ **Consistency**: Full rebuilds ensure atomic content updates  
✅ **Accessibility**: Global fixes deploy to all pages simultaneously  
✅ **Maintainability**: Clear separation between build and editor contexts  
✅ **Resilience**: Automatic retries and error handling via SDK

### Negative

⚠️ **Build Time Dependency**: Content updates require full rebuild (currently acceptable)  
⚠️ **Configuration Requirement**: Requires `cacheComponents: true` in `next.config.ts`  
⚠️ **Worker Limit**: 10-worker concurrency limit may impact build times on high-CPU machines (mitigated by preventing race conditions)

### Neutral

📝 **No ISR**: Defers incremental revalidation complexity until clearly needed  
📝 **Static Output**: Maintains existing 1-year browser/CDN cache patterns

## References

- [ADR 0007: Next.js 16 Upgrade](./0007-next-js-16-upgrade.md)
- [Next.js 16 use cache Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [Next.js 16 cacheComponents Config](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)
- [Next.js 16 Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Next.js experimental.cpus Config](https://nextjs.org/docs/app/api-reference/config/next-config-js/experimental#cpus)
- [Storyblok JavaScript Client](https://github.com/storyblok/storyblok-js-client)
- [Storyblok API Rate Limits](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/rate-limit)
- [Netlify Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/)