# ADR 0008: Next.js 16 Caching Strategy for Storyblok

**Date**: 2025-12-03  
**Status**: Accepted (Updated 2025-12-04)  
**Supersedes**: Previous `unstable_cache` implementation

## Context

Following the [Next.js 16 upgrade (ADR 0007)](./0007-next-js-16-upgrade.md), we needed to optimize our Storyblok content caching strategy while maintaining our static-first approach with webhook-triggered rebuilds on Netlify.

### Current Architecture
- **341 static pages** generated via `generateStaticParams`
- **Webhook-triggered full rebuilds** on Storyblok content changes
- **Atomic deployments** on Netlify with 1-year edge caching
- **Separate dev/prod Storyblok spaces** for environment isolation
- **Storyblok visual editor** requires draft content access

## Decision

### 1. Migrate to Stable `cache` Function

**Action**: Replace all `unstable_cache` instances with React's stable `cache` function.

**Implementation**:
```typescript
// utilities/data/getStoryData.ts
import { cache } from 'react'; // Note: from 'react', not 'next/cache' in Next.js 16

export const getStoryDataCached = cache(getStoryData);
```

**Simplified Approach**:
- React's `cache` takes a single argument (the function to cache)
- Cache keys are automatically derived from function arguments
- No need for manual cache key arrays or BUILD_ID tracking
- Each build process gets a fresh cache instance automatically

**Removed**:
- `BUILD_ID` from cache keys (automatic per-build isolation)
- `revalidate` option (not applicable for React's cache)
- Cache tags (reserved for future ISR if needed)
- Custom fetch configuration (React's cache handles deduplication)

**Benefits**:
- Stable, officially-supported React API
- Automatic build-time deduplication (reduces Storyblok API calls)
- Simpler configuration - just wrap the function
- Cache automatically cleared between builds
- Works seamlessly with Next.js 16's extended fetch behavior

### 2. Simplified Caching Strategy with React's cache and Storyblok SDK

**Action**: Use React's `cache` function for build-time deduplication; configure Storyblok SDK for optimal performance.

**How It Works**:
1. **React's `cache` function**: Deduplicates identical function calls *within a single build*
2. **Storyblok SDK memory cache**: Reduces redundant API calls during build process
3. **Next.js 16 build isolation**: Each new build process starts fresh
4. **Webhook triggers**: New build = fresh cache = latest content

**Rationale**:
- Leverages Storyblok SDK's built-in caching capabilities
- React cache provides build-time deduplication
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
- Caching strategy (no-store + cache function)
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

### 5. Enhanced Documentation

**Action**: Added comprehensive documentation across caching-related code:

- `utilities/data/*.ts` - JSDoc with version and caching strategies
- `utilities/storyblok.tsx` - Custom fetch documentation
- `README.md` - Updated with Next.js 16 caching approach (pending)
- `AGENTS.md` - Updated architecture patterns (pending)

## Consequences

### Positive

✅ **Build Performance**: React `cache` + Storyblok SDK memory cache reduces redundant API calls  
✅ **Rate Limiting**: SDK rate limiting (6 RPS) prevents API errors during parallel builds  
✅ **Content Freshness**: Each build gets fresh content from Storyblok  
✅ **Stability**: Uses stable React API + Storyblok SDK built-in features  
✅ **Simplicity**: No custom fetch configuration needed  
✅ **Consistency**: Full rebuilds ensure atomic content updates  
✅ **Accessibility**: Global fixes deploy to all pages simultaneously  
✅ **Maintainability**: Clear separation between build and editor contexts  
✅ **Resilience**: Automatic retries and error handling via SDK

### Negative

⚠️ **Build Time Dependency**: Content updates require full rebuild (currently acceptable)

### Neutral

📝 **No ISR**: Defers incremental revalidation complexity until clearly needed  
📝 **Static Output**: Maintains existing 1-year browser/CDN cache patterns

## References

- [ADR 0007: Next.js 16 Upgrade](./0007-next-js-16-upgrade.md)
- [Next.js 16 Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Next.js cache Function](https://nextjs.org/docs/app/api-reference/functions/cache)
- [React cache Function](https://react.dev/reference/react/cache)
- [Storyblok JavaScript Client](https://github.com/storyblok/storyblok-js-client)
- [Storyblok API Rate Limits](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/rate-limit)
- [Netlify Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/)