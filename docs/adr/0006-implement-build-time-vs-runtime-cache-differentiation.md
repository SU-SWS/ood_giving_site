# 6. Implement Build-Time vs Runtime Cache Differentiation

Date: 2025-09-25

## Status

Accepted

## Context

Building upon ADR-0005's atomic deployment cache strategy, we encountered NoFallbackError exceptions in Netlify serverless functions. Investigation revealed that the error was caused by `dynamicParams = false` settings in dynamic routes, which prevented Next.js from handling unknown paths gracefully in serverless environments.

### Root Cause Analysis

The NoFallbackError occurred when:
1. **Unknown paths** were requested that weren't included in `generateStaticParams`
2. **`dynamicParams = false`** prevented runtime handling of these paths
3. **Serverless functions** couldn't fall back to 404 handling, causing internal errors

### Solution Requirements

To resolve this while maintaining performance, we needed to:
1. **Change `dynamicParams = true`** to allow runtime 404 handling
2. **Handle 404s ourselves** through application logic rather than framework-level fallbacks
3. **Prevent unnecessary Storyblok API calls** for known-invalid paths to avoid performance degradation
4. **Maintain content freshness during builds** while preserving runtime caching benefits

### Key Problems

1. **NoFallbackError prevention**: Need `dynamicParams = true` but with intelligent 404 handling
2. **API call optimization**: Must avoid hitting Storyblok API for every invalid path
3. **Build vs runtime caching**: Builds need fresh content, runtime needs performance caching
4. **Environment detection**: Use Netlify-specific variables

### Requirements

1. **Fresh content during builds**: Static generation must always use latest content from Storyblok  
2. **Optimal runtime caching**: User requests should benefit from long-term edge caching
3. **Netlify compatibility**: Build detection must use Netlify-specific environment variables
4. **Performance preservation**: Maintain excellent runtime performance with edge caching
5. **Error prevention**: Eliminate NoFallbackError and other cache-related issues

## Decision

Building upon ADR-0005's atomic deployment strategy, we have implemented a **self-managed 404 handling system with build-aware dual caching** to resolve NoFallbackError while maintaining optimal performance:

### Primary Solution: Self-Managed 404 Handling

**Route Configuration Changes:**
- Changed `dynamicParams = false` to `dynamicParams = true` 
- Added `revalidate = 604800` for edge caching optimization

**404 Prevention Strategy:**
- Pre-validate all routes against known slugs before making Storyblok API calls
- Early `notFound()` for invalid paths to prevent unnecessary API requests
- Maintain cached list of known valid slugs for fast validation

### Consequence: Build-Aware Dual Caching

To support the 404 handling system without performance degradation, we implemented context-aware caching:

### Build-Time Caching (Fresh Data)

**When applied:**
- `process.env.NETLIFY === 'true'`

**Configuration:**
```typescript
unstable_cache(fn, [`build-${Date.now()}-${path}`], {
  tags: ['story', 'page', 'build'],
  revalidate: false
})
```

**Applied to:**
- `generateStaticParams()` via `getAllStoriesForBuild()`
- `generateMetadata()` via `getStoryDataSmart()`  
- Page rendering during builds via `getStoryDataSmart()`

**Rationale:**
- Timestamp-based cache keys ensure fresh data for each build
- No revalidation prevents cache persistence across builds
- All static generation uses latest content from Storyblok

### Runtime Caching (Performance Optimized)

**When applied:**
- Not in Netlify build context (regular user requests)
- Netlify Functions execution
- Client-side requests

**Configuration:**
```typescript
unstable_cache(fn, [], {
  tags: ['story', 'page'],
  revalidate: 604800 // 7 days
})
```

**Applied to:**
- All user-facing page requests
- API routes and serverless functions
- Client-side data fetching

**Rationale:**
- Long cache duration (7 days) for optimal edge performance
- Consistent cache keys ensure predictable behavior
- Leverages Netlify's edge network for global performance

**Dynamic Routes:**
- Editor: `dynamic = 'force-dynamic'` (always fresh)
- Search: `dynamic = 'force-dynamic'` (server-side processing)

### Self-Managed 404 Handling (Primary Solution)

**Known Slugs Validation:**
```typescript
export const getKnownSlugsCached = unstable_cache(
  () => getKnownSlugs(false),
  ['known-slugs'],
  { tags: ['story', 'slugs'], revalidate: 604800 }
);

// Pre-validate routes to prevent unnecessary Storyblok requests
const knownSlugs = await getKnownSlugsCached();
if (!knownSlugs.has(slugPath)) {
  notFound(); // Handle 404 ourselves instead of relying on framework fallback
}
```

**Benefits:**
- Eliminates NoFallbackError by allowing runtime path handling
- Prevents unnecessary Storyblok API calls for invalid paths
- Maintains fast 404 responses through pre-validation

## Consequences

### Positive

1. **NoFallbackError Resolution**
   - Eliminates serverless function errors caused by `dynamicParams = false`
   - Enables graceful 404 handling in Netlify Functions
   - Prevents internal server errors for unknown paths

2. **API Call Optimization**
   - Pre-validation prevents unnecessary Storyblok API requests for invalid paths
   - Fast 404 responses through cached slug validation
   - Reduced API usage and improved performance

3. **Content Freshness Guaranteed**
   - Builds always use latest content from Storyblok
   - Eliminates stale content in static generation
   - Consistent content across all build outputs

4. **Optimal Runtime Performance**
   - 7-day edge caching for user requests
   - Reduced serverless function invocations
   - Global edge distribution via Netlify CDN

5. **Environment Compatibility**
   - Proper Netlify environment variable detection
   - Works correctly across production, dev, and preview contexts
   - No dependency on Vercel-specific variables

6. **Developer Experience**
   - Automatic context detection - no manual configuration
   - Clear separation of build vs runtime concerns
   - Predictable caching behavior

### Negative

1. **Increased Build Complexity**
   - More sophisticated cache key management
   - Multiple caching strategies to maintain
   - Context-dependent behavior patterns

2. **Potential Resource Usage**
   - Fresh API calls during every build
   - Increased Storyblok API usage during builds
   - Larger cache storage requirements

### Mitigation Strategies

1. **Build Optimization**
   - Efficient data fetching patterns
   - Minimal API calls during builds
   - Reuse of build-time data across functions

2. **Fallback Strategies**
   - Graceful degradation for failed API calls
   - Error boundaries for cache-related issues
   - Default content for missing data

## Related ADRs

- [ADR-0005: Implement Atomic Deployment Cache Strategy](./0005-implement-atomic-deployment-cache-strategy.md) - Foundation strategy this builds upon
- [ADR-0002: Use Next redirect functionality](./0002-use-next-redirect-functionality-to-support-redirects.md) - Complementary routing strategy
- [ADR-0004: Use Storyblok plugin for Algolia sync](./0004-use-storyblok-plugin-to-sync-stories-with-algolia.md) - Search integration considerations

## References

- [Next.js: unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
- [Netlify: Environment Variables](https://docs.netlify.com/build/configure-builds/environment-variables/)
- [Storyblok: Content Delivery API](https://www.storyblok.com/docs/api/content-delivery/v2)
- [Netlify: Serverless Functions](https://docs.netlify.com/functions/overview/)