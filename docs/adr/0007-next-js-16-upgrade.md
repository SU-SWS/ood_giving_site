# 7. Upgrade to Next.js 16

Date: 2025-12-03

## Status

Accepted

## Context

The Stanford OOD Giving Site was running on Next.js 15.5.3 with React 19.1.1. Next.js 16.0.7 was released with significant improvements including:

- **Turbopack as Default**: Stable Turbopack bundler for 2-5× faster production builds and up to 10× faster Fast Refresh
- **Cache Components**: New caching model with opt-in behavior and improved developer experience
- **Enhanced Routing**: Optimized navigations with layout deduplication and incremental prefetching
- **React 19.2 Support**: View Transitions, `useEffectEvent`, and Activity components
- **Breaking Changes**: Async request APIs now fully required, middleware deprecated in favor of proxy

### Key Architecture Considerations

Our site uses a static-first architecture with:
- **Static generation** via `generateStaticParams` with `dynamicParams = false`
- **Storyblok headless CMS** with React Server Components
- **Netlify hosting** with aggressive caching and atomic deployments
- **Custom cache handler** to bypass Next.js's 2MB data cache limit
- **middleware.ts** for Storyblok editor access validation

## Decision

We will upgrade to Next.js 16.0.7 with the following changes:

### 1. Remove Custom Cache Handler

**Rationale**: Next.js 16 introduces a completely redesigned caching architecture with "Cache Components" that should handle large payloads more efficiently. The custom handler was a workaround that imported internal Next.js modules, creating technical debt and fragility.

**Action**: Removed `cacheHandler: require.resolve('next/dist/server/lib/incremental-cache/file-system-cache.js')` from `next.config.ts`.

**Impact**: Build succeeds but shows warnings for pages with >2MB payloads. These warnings are non-fatal - pages still render correctly but without the data cache optimization.

### 2. Migrate Middleware to Route-Level Validation

**Rationale**: Next.js 16 deprecates `middleware.ts` in favor of `proxy.ts` (Node.js runtime only, no Edge support). Our middleware only validates Storyblok editor access, which is better colocated with the route it protects.

**Action**: 
- Removed `middleware.ts`
- Created `/app/(editor)/editor/EditorGuard.tsx` server component for validation
- Refactored `/app/(editor)/editor/page.tsx` to use server/client component pattern
- Created `EditorClient.tsx` for client-side Storyblok interactions

**Benefits**:
- Explicit validation logic colocated with the route
- Eliminates global middleware for single-route use case
- Aligns with App Router philosophy of colocation
- Avoids Edge/Node runtime considerations

### 3. Remove ESLint Configuration from next.config.ts

**Rationale**: Next.js 16 no longer supports the `eslint` property in `next.config.ts`. ESLint configuration should be handled via `eslint.config.mjs` (flat config format).

**Action**: Removed `eslint: { dirs: [...] }` from `next.config.ts`.

**Note**: Our existing `eslint.config.mjs` handles all ESLint configuration correctly.

### 4. Update Dependencies

Updated the following packages:
- `next`: 15.5.3 → 16.0.7
- `react` & `react-dom`: 19.1.1 → 19.2.1
- `@types/react` & `@types/react-dom`: Updated to latest
- `@next/third-parties`: Updated to support Next.js 16
- `@storyblok/react`: Updated to latest
- `react-instantsearch-nextjs`: Updated to latest
- `@netlify/plugin-nextjs`: Updated to latest

## Consequences

### Positive

1. **Performance Improvements**:
   - Turbopack's faster builds and Fast Refresh improve developer experience
   - Enhanced routing with layout deduplication reduces network transfer sizes
   - React 19.2 features enable better performance optimizations

2. **Cleaner Architecture**:
   - Removed internal Next.js module dependency (custom cache handler)
   - Editor validation logic is now explicit and colocated
   - Better aligned with Next.js App Router patterns

3. **Future-Proofing**:
   - Using officially supported Next.js 16 APIs and patterns
   - Prepared for future Next.js enhancements
   - Reduced technical debt

### Negative

1. **Data Cache Warnings** (Non-Fatal):
   - Pages with >2MB Storyblok content show cache warnings
   - These pages still render correctly but miss data cache optimization
   - Potential performance impact during high-traffic periods

2. **Testing Requirements**:
   - Comprehensive testing needed for all static generation paths
   - Storyblok editor access validation must be verified
   - Cache invalidation via webhooks requires validation

## Follow-Up Actions

### Immediate (Required Before Production)

1. **Comprehensive Testing**:
   - ✅ TypeScript type checking passes
   - ✅ ESLint passes with no warnings
   - ✅ Build completes successfully (341 static pages generated)
   - [ ] Test Storyblok editor access validation
   - [ ] Test all Storyblok webhook-triggered revalidation
   - [ ] Visual regression testing for critical pages
   - [ ] Accessibility audit (WCAG 2.1 AA compliance)
   - [ ] Performance benchmarking (Core Web Vitals)

2. **Documentation Updates**:
   - [ ] Update README.md with Next.js 16 specifics
   - [ ] Update AGENTS.md with architectural changes
   - [ ] Document removed middleware pattern for team

### Short-Term (Within 1-2 Sprints)

3. **Custom Data Cache Handler**:
   - **Decision**: Implement custom cache handler using Upstash Redis
   - **Rationale**: Addresses 2MB limit for large Storyblok payloads
   - **Approach**: Use Next.js 16's `incrementalCacheHandlerPath` API
   - **See**: Future ADR for detailed implementation plan
   - **Priority**: High (especially before high-traffic periods like admissions)

4. **Content Payload Optimization**:
   - Audit pages with >2MB payloads (up to 32MB observed)
   - Work with content editors to identify optimization opportunities
   - Consider splitting large monolithic pages into smaller Storyblok entries
   - **Priority**: Medium (complements cache handler solution)

### Long-Term (Future Consideration)

5. **Cache Components Migration**:
   - Evaluate Next.js 16's new "Cache Components" feature
   - Consider migrating to `"use cache"` directive for explicit caching
   - Wait for production experience and community best practices
   - **Priority**: Low (experimental feature, needs maturity)

## Build Output

The build successfully generates 341 static pages:

```
Route (app)                                Revalidate  Expire
├ ● /[[...slug]]                                  10m      1y
│ ├ 304 pages generated
├ ƒ /editor
├ ƒ /endowed-positions/[slug]
├ ƒ /endowed-positions/search
```

## References

- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19.2 Announcement](https://react.dev/blog/2025/10/01/react-19-2)
- Web Dev Team Consultation (via MCP server)

## Authors

- AI Agent (GitHub Copilot)
- Reviewed by: Web Development Team (Architecture consultation)
