# 5. Implement Atomic Deployment Cache Strategy

Date: 2025-09-23

## Status

Accepted

## Context

The Stanford Giving Site is a Next.js 15+ application using Storyblok as a headless CMS, deployed on Netlify. The site requires optimal performance while maintaining content freshness and supporting real-time preview capabilities for content editors. We needed to establish a consistent caching and rendering strategy that aligns with Netlify's atomic deployment model and the site's content management workflow.

### Key Requirements

1. **Static-first approach**: Maximize static generation for performance and SEO
2. **Atomic deployments**: Leverage Netlify's atomic deployment strategy instead of ISR
3. **Real-time editing**: Support Storyblok's visual editor with live preview
4. **Content freshness**: Ensure content updates are reflected without manual cache invalidation
5. **Serverless optimization**: Minimize serverless function invocations on Netlify
6. **Error boundaries**: Provide graceful error handling at appropriate route levels

## Decision

We have implemented a **dual-strategy caching approach** that distinguishes between static content routes and dynamic preview routes:

### Static Generation Strategy (Primary)

**Configuration:**
- `dynamic = 'force-static'`
- `revalidate = 31536000` (1 year)
- `generateStaticParams()` for dynamic routes
- `dynamicParams = false` where appropriate

**Applied to:**
- All Storyblok content pages (`(storyblok)/[[...slug]]/*`)
- Endowed positions section (`endowed-positions/*`)
- Root-level pages (`not-found.tsx`, `forbidden.tsx`, `loading.tsx`)
- Special routes (`robots.ts`, `sitemap.ts`)

**Rationale:**
- Content is primarily static and changes infrequently
- Atomic rebuilds handle content updates more reliably than ISR
- Maximum performance with edge caching
- Better SEO with consistent static rendering

### Dynamic Generation Strategy (Editor-only)

**Configuration:**
- `dynamic = 'force-dynamic'`
- `revalidate = 0` (no caching)

**Applied to:**
- Editor interface routes (`(editor)/editor/*`)

**Rationale:**
- Real-time preview requires fresh data on every request
- Authentication and session-based functionality
- Low traffic volume (editor-only access)

### Content Update Workflow

1. **Content changes** in Storyblok trigger webhook to Netlify
2. **Atomic rebuild** generates fresh static site with updated content
3. **Zero-downtime deployment** replaces entire site atomically
4. **No cache invalidation** needed - fresh deployment contains all updates

### Error Boundary Strategy

**Hierarchical error handling:**
- `global-error.tsx`: Root-level fallback
- Route group errors: `(storyblok)/error.tsx`, `(editor)/error.tsx`
- Route-specific errors: Per-route `error.tsx` files
- All error boundaries use static generation for reliability

## Consequences

### Positive

1. **Improved Performance**
   - Static pages served from Netlify edge network
   - Reduced serverless function cold starts
   - Consistent page load times

2. **Simplified Cache Management**
   - No manual cache invalidation required
   - Atomic deployments ensure content consistency
   - Eliminates cache-related debugging issues

3. **Better Reliability**
   - Static generation reduces server-side failure points
   - Error boundaries provide graceful degradation
   - Predictable behavior across environments

4. **Developer Experience**
   - Clear separation between static and dynamic routes
   - Consistent configuration patterns
   - Aligned with Next.js App Router best practices

5. **Content Editor Experience**
   - Real-time preview in editor interface
   - Predictable content update workflow
   - No manual cache clearing required

### Negative

1. **Build Time Impact**
   - Full rebuilds required for any content change
   - Longer deployment times for large content updates
   - All pages regenerated regardless of actual changes

2. **Resource Usage**
   - Higher build resource consumption
   - Potential webhook rate limiting concerns
   - More frequent CI/CD pipeline executions

### Mitigation Strategies

1. **Build Optimization**
   - Efficient `generateStaticParams()` implementations
   - Selective page generation based on environment
   - Optimized data fetching with `unstable_cache`

2. **Webhook Management**
   - Debounced webhook triggers for bulk content updates
   - Environment-specific webhook configurations
   - Monitoring and alerting for failed builds

3. **Content Strategy**
   - Editor training on batch content updates
   - Staging environment for content validation
   - Clear guidelines for high-impact content changes

## Implementation Details

### Route Configuration Examples

```typescript
// Static content route
export const dynamic = 'force-static';
export const revalidate = 31536000;
export const generateStaticParams = async () => { /* ... */ };

// Dynamic editor route  
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

### Data Fetching Pattern

```typescript
// Cached data fetching for static routes
export const getStoryDataCached = unstable_cache(
  getStoryData,
  [],
  { tags: ['story', 'page'] }
);
```

### Error Boundary Pattern

```typescript
// Consistent error boundary implementation
export default function Error({ error }: { error: Error }) {
  return (
    <Container width="site" className="rs-my-8 text-white">
      <h1>Friendly Error Message</h1>
      <p>User-friendly guidance and recovery options</p>
    </Container>
  );
}
```

## Related ADRs

- [ADR-0002: Use Next redirect functionality](./0002-use-next-redirect-functionality-to-support-redirects.md) - Complements this strategy with redirect handling
- [ADR-0004: Use Storyblok plugin for Algolia sync](./0004-use-storyblok-plugin-to-sync-stories-with-algolia.md) - Search integration that works with static generation

## References

- [Next.js App Router: Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Netlify: Atomic Deployments](https://docs.netlify.com/site-deploys/overview/#atomic-deploys)
- [Storyblok: Webhooks](https://www.storyblok.com/docs/guide/in-depth/webhooks)
- [Stanford Decanter Design System](https://decanter.stanford.edu/)