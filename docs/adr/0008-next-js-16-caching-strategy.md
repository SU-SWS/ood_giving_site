# ADR 0008: Next.js 16 Caching Strategy for Storyblok

**Date**: 2025-12-03  
**Status**: Accepted  
**Supersedes**: Previous `unstable_cache` implementation

## Context

Following the [Next.js 16 upgrade (ADR 0007)](./0007-next-js-16-upgrade.md), we needed to optimize our Storyblok content caching strategy while maintaining our static-first approach with webhook-triggered rebuilds on Netlify.

### Current Architecture
- **341 static pages** generated via `generateStaticParams`
- **Webhook-triggered full rebuilds** on Storyblok content changes
- **Atomic deployments** on Netlify with 1-year edge caching
- **Separate dev/prod Storyblok spaces** for environment isolation
- **Storyblok visual editor** requires draft content access

### Web Team Consultation

The institutional web development team (including Architecture, Frontend, Backend, Storyblok Specialist, and Accessibility teams) unanimously recommended:

1. **Adopt stable `cache` function** over deprecated `unstable_cache`
2. **Maintain static-first with full rebuilds** (not ISR at current scale)
3. **Use `cache: 'no-store'` on fetch** to guarantee fresh content per build
4. **Clear version separation** between published (build) and draft (editor) content

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

### 2. Simplified Caching Strategy with React's cache

**Action**: Use React's `cache` function for build-time deduplication; rely on Next.js 16's fetch behavior for fresh content.

**Implementation**: Wrapped all data fetching utilities with React's `cache`:
```typescript
// utilities/data/*.ts
import { cache } from 'react';

export const getStoryDataCached = cache(getStoryData);
export const getAllStoriesCached = cache(getAllStories);
export const getGlobalAlertsCached = cache(getGlobalAlerts);
export const getSearchConfigBlokCached = cache(getSearchConfigBlok);
```

**How It Works**:
1. **React's `cache` function**: Deduplicates identical function calls *within a single build*
2. **Next.js 16 fetch behavior**: Each new build process starts fresh (no persistent cache across builds)
3. **Storyblok SDK**: Internally uses `fetch`, which Next.js 16 extends and manages
4. **Webhook triggers**: New build = fresh cache = latest content

**Rationale**:
- Simpler than custom fetch configuration
- Leverages React and Next.js built-in behaviors
- Automatic fresh content per build (no manual cache busting needed)
- Build-time deduplication prevents redundant API calls

**Cache Flow**:
```
Build Process (triggered by webhook)
├── Fresh build process starts
├── React cache() initialized (empty)
├── generateStaticParams calls getAllStoriesCached()
│   └── First call → Fetches from Storyblok → Cached in React
├── Page rendering calls getStoryDataCached('same-slug')
│   └── Duplicate call → Returns cached result (no API call)
└── Static HTML generated and deployed

Next Build Process (after webhook)
└── Entirely fresh cache, fetches latest content
```

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

✅ **Build Performance**: `cache` function reduces redundant Storyblok API calls during build  
✅ **Content Freshness**: `cache: 'no-store'` guarantees latest content for each build  
✅ **Stability**: Uses stable APIs with no deprecation risk  
✅ **Simplicity**: Eliminates complex time-based revalidation logic  
✅ **Consistency**: Full rebuilds ensure atomic content updates  
✅ **Accessibility**: Global fixes deploy to all pages simultaneously  
✅ **Maintainability**: Clear separation between build and editor contexts

### Negative

⚠️ **Build Time Dependency**: Content updates require full rebuild (currently acceptable)  
⚠️ **API Rate Limits**: Large page counts could approach Storyblok API limits (monitor usage)

### Neutral

📝 **No ISR**: Defers incremental revalidation complexity until clearly needed  
📝 **Static Output**: Maintains existing 1-year browser/CDN cache patterns

## Implementation Details

### Files Modified

1. **utilities/data/getStoryData.ts**
   - Migrated from `unstable_cache` to React's `cache` function
   - Added version strategy documentation
   - Simplified implementation (no cache keys needed - React derives from args)

2. **utilities/data/getAllStories.ts**
   - Migrated to React's `cache` function
   - Enhanced documentation for `cdn/links` endpoint usage

3. **utilities/data/getGlobalAlerts.ts**
   - Migrated to React's `cache` function
   - Documented global alert filtering strategy

4. **utilities/data/getSearchConfigBlok.ts**
   - Migrated to React's `cache` function
   - Documented global config caching

5. **utilities/storyblok.tsx**
   - Added documentation explaining Next.js 16 caching strategy
   - Clarified that React's `cache` wrapper in data utilities handles deduplication
   - Documented version handling (published vs draft)

6. **AGENTS.md**
   - Updated architecture section with Next.js 16 caching strategy
   - Reference to ADR 0008 for detailed caching information

### Implementation Notes

**React `cache` Function**:
- In Next.js 16, the stable `cache` function is exported from `react`, not `next/cache`
- It takes a single argument (the function to cache)
- Cache keys are automatically derived from function arguments
- Perfect for build-time deduplication without persistent cross-build caching

**Static Page Revalidation**:
- `export const revalidate = 31536000` remains on static pages
- This configures browser/CDN caching of the *static HTML output* (1 year)
- Not related to build-time data fetching (which uses React's `cache`)
- Works perfectly with webhook-triggered rebuilds for atomic content updates

### No Changes Required

- **app/(editor)/editor/EditorClient.tsx** - Already uses `version: 'draft'` correctly
- **app/(storyblok)/[[...slug]]/page.tsx** - Static generation works with new caching
- **netlify.toml** - Edge caching configuration unchanged

## Monitoring & Validation

### Build Performance Metrics
- Monitor Netlify build times (baseline: ~10-15s for 341 pages)
- Track Storyblok API usage against rate limits
- Verify `cache` function reduces API call count

### Content Freshness Validation
- Test webhook → rebuild flow after content changes
- Verify visual editor shows latest draft content
- Confirm production shows latest published content post-deploy

### Error Scenarios
- Monitor build logs for Storyblok API failures
- Track failed webhook triggers
- Verify graceful degradation for API errors

## Future Considerations

### Potential ISR Implementation (if needed)

If build times become problematic:

1. **On-Demand Revalidation**:
   - Create `/api/revalidate` route with `revalidatePath()` or `revalidateTag()`
   - Configure Storyblok webhooks to call revalidation endpoint
   - Requires cache tag strategy implementation

2. **Hybrid Approach**:
   - Core pages: Static generation (current approach)
   - Blog/news: Time-based ISR (e.g., `revalidate: 3600`)
   - Requires careful cache invalidation coordination

3. **External Cache Store**:
   - Consider Upstash Redis for distributed cache coordination
   - Useful if ISR across multiple serverless instances
   - Aligns with ADR 0007 future work

### Performance Optimizations

- **Pagination**: If page count grows, implement pagination in `getAllStories`
- **Parallel Builds**: Explore Netlify parallel build features
- **Build Caching**: Optimize `node_modules` and dependency caching

## References

- [ADR 0007: Next.js 16 Upgrade](./0007-next-js-16-upgrade.md)
- [Next.js 16 Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Next.js cache Function](https://nextjs.org/docs/app/api-reference/functions/cache)
- [Storyblok API Documentation](https://www.storyblok.com/docs/api/content-delivery/v2)
- [Netlify Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/)

## Approval

**Consulted**: Institutional Web Development Team (Manager, Architect, Frontend, Backend, Storyblok Specialist, Accessibility, DevOps)  
**Reviewed**: [Pending]  
**Approved**: [Pending]
