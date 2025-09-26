# 0005: 404 Handling and Build-Time Caching Strategy

## Status
Accepted

## Context

The Stanford OOD Giving Site experienced several issues with dynamic route handling and content freshness that needed to be addressed:

1. **404 Handling Problems**: Single slug pages (e.g., `/about`) were returning 404 errors due to inconsistent slug processing between `generateStaticParams` and `validateSlugPath` functions.

2. **noFallback Bug**: Using `dynamicParams = false` caused Next.js noFallback issues when invalid routes were accessed.

3. **Rate Limiting**: Build-time content fetching was hitting Storyblok API rate limits due to inconsistent cache versioning strategies.

4. **Content Freshness**: Need to ensure fresh content at build time while maintaining optimal edge caching for runtime performance.

5. **Pagination Issues**: Endowed positions pagination was broken due to static rendering conflicting with dynamic search parameters.

## Decision

We implemented a comprehensive solution addressing all these issues:

### 1. Consistent Slug Processing

**Problem**: `generateStaticParams` and `validateSlugPath` used different logic for processing Storyblok slugs, causing valid routes to be treated as 404s.

**Solution**: Unified the slug processing logic across both functions:

```typescript
// Both functions now use identical logic:
const splitSlug = slug.split('/');
const cleanSlug = splitSlug.filter((s: string) => s.length);

if (cleanSlug.length === 1 && cleanSlug[0] === 'home') {
  // Handle home page consistently
  validSlugs.push('');
} else {
  validSlugs.push(cleanSlug.join('/'));
}
```

### 2. 404 Handling Strategy

**Problem**: `dynamicParams = false` caused noFallback errors for invalid routes.

**Solution**: Use `dynamicParams = true` with code-based validation:

```typescript
// Allow dynamic params but handle 404s in code
export const dynamicParams = true;

// Validate before making API calls
const isValidPath = await validateSlugPath(slug || []);
if (!isValidPath) {
  notFound(); // Early return without API calls
}
```

### 3. Build-Time Caching with BUILD_ID

**Problem**: Content needed to be fresh per build but cached within builds to prevent rate limits.

**Solution**: Include `BUILD_ID` in cache keys for atomic build freshness:

```typescript
const BUILD_ID = process.env.BUILD_ID || '';

export const getStoryDataCached = unstable_cache(
  getStoryData,
  ['story-data', BUILD_ID], // Fresh cache per build
  {
    tags: ['story', 'page'],
    revalidate: 600, // 10-minute runtime cache
  },
);
```

**How it works**:
- **Different builds**: Different `BUILD_ID` → Different cache keys → Fresh API calls
- **Same build**: Same cache keys → Deduplicated API calls → Rate limit protection

### 4. Runtime Caching Strategy

**Static Pages** (`force-static`):
```typescript
export const revalidate = 31536000; // 1 year edge cache
export const dynamic = 'force-static';
```

**Paginated Pages** (`auto` rendering):
```typescript
export const revalidate = 31536000; // 1 year base page cache
export const dynamic = 'auto'; // Allow search parameters
```

### 5. Sitemap Optimization

**Problem**: Sitemap was using component-heavy Storyblok client causing missing component warnings.

**Solution**: Use lightweight `storyblok-js-client` directly:

```typescript
import StoryblokClient from 'storyblok-js-client';

const storyblokApi = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
});
```

## Architecture

### Build-Time Flow
```
1. generateStaticParams() → Get all stories → Filter & clean slugs
2. For each page:
   - validateSlugPath() → Check against cached valid slugs
   - getStoryDataCached() → Fetch with BUILD_ID cache key
   - Render static page
```

### Runtime Flow
```
1. User requests page → Netlify edge cache (1 year)
2. Cache miss → Static page served
3. Search params (?page=2) → Server-side rendering with cached data
```

### Cache Hierarchy
```
1. Netlify Edge Cache: 1 year (static pages)
2. Next.js Cache: BUILD_ID scoped (build deduplication)  
3. Storyblok CDN: Automatic cache invalidation
```

## Consequences

### Positive
- ✅ **404s Fixed**: Consistent slug processing eliminates false 404s
- ✅ **Rate Limit Protection**: BUILD_ID cache keys prevent API overuse
- ✅ **Fresh Content**: Each deployment gets latest content from Storyblok
- ✅ **Optimal Performance**: 1-year edge caching with proper invalidation
- ✅ **Working Pagination**: Hybrid static/dynamic rendering supports search params
- ✅ **Clean Sitemap**: Lightweight client eliminates component warnings

### Trade-offs
- 🔄 **Complexity**: More nuanced caching strategy requires understanding
- ⚡ **Build Time**: Slight increase due to validation layer
- 💾 **Cache Storage**: Multiple cache variants per BUILD_ID (acceptable)

## Implementation Notes

### Key Files Modified
- `utilities/validateSlugPath.ts`: Unified slug processing logic
- `utilities/data/*.ts`: BUILD_ID cache keys for all data fetching
- `app/(storyblok)/[[...slug]]/page.tsx`: 404 handling and static rendering
- `app/endowed-positions/[slug]/page.tsx`: Hybrid rendering for pagination
- `app/sitemap.ts`: Lightweight Storyblok client

### Environment Variables
- `BUILD_ID`: Netlify-provided UUID for each deployment
- Used as cache key component for atomic build freshness

### Next.js Configuration
- Static generation with `generateStaticParams`
- Force static rendering for content pages
- Auto rendering for paginated pages
- 1-year revalidation aligned with Netlify edge caching

## Monitoring

### Success Metrics
- Zero false 404 errors on valid routes
- Reduced Storyblok API calls during builds
- Consistent pagination functionality
- Clean build logs without component warnings

### Performance Metrics
- Edge cache hit rates (target: >90%)
- Build time consistency
- Page load times maintained

## Related ADRs
- ADR-003: Next.js App Router Implementation
- ADR-004: Netlify Deployment Strategy