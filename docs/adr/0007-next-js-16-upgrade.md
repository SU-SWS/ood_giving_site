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

**Impact**: Builds successfully with no cache warnings after configuring Storyblok SDK rate limiting and memory cache.

### 2. Migrate Middleware to Route-Level Validation

**Rationale**: While Next.js 16 still supports `middleware.ts`, our middleware only validated Storyblok editor access for a single route. This single-purpose middleware is better implemented as route-level validation, colocated with the route it protects. This aligns with App Router best practices of colocation and explicit security boundaries.

**Action**:
- Removed `middleware.ts`
- Created `/app/(editor)/editor/EditorGuard.tsx` server component for validation
- Implemented Storyblok's recommended signed token verification with SHA-1 hashing
- Added timestamp validation to prevent replay attacks (tokens must be <1 hour old)
- Refactored `/app/(editor)/editor/page.tsx` to use server/client component pattern
- Created `EditorClient.tsx` for client-side Storyblok interactions

**Security Implementation**:
The EditorGuard now properly implements Storyblok's security recommendations:
1. Validates the SHA-1 signed token: `SHA1(spaceId:previewToken:timestamp)`
2. Ensures timestamp is within the last hour (3600 seconds) to prevent replay attacks
3. Provides detailed error logging for debugging while maintaining security

**Benefits**:
- Explicit validation logic colocated with the route
- Eliminates global middleware for single-route use case
- Aligns with App Router philosophy of colocation
- Avoids Edge/Node runtime considerations
- **Enhanced security** with proper signed token validation and timestamp checks

### 3. Remove ESLint Configuration from next.config.ts

**Rationale**: Next.js 16 no longer supports the `eslint` property in `next.config.ts`. ESLint configuration should be handled via `eslint.config.mjs` (flat config format).

**Action**: Removed `eslint: { dirs: [...] }` from `next.config.ts`.

**Note**: Our existing `eslint.config.mjs` handles all ESLint configuration correctly.

### 4. Configure Storyblok SDK with Rate Limiting and Memory Cache

**Rationale**: Storyblok Content API has a 60 RPS rate limit. With Next.js using 10-15 build threads, we need to configure the SDK to prevent rate limit errors and optimize caching.

**Action**: Updated `utilities/storyblok.tsx` to configure `apiOptions`:
- `region: 'eu'` - CRITICAL: This space is hosted in the EU region
- `rateLimit: 6` - Safe rate per thread (6 RPS × 10 threads = 60 RPS max)
- `cache: { type: 'memory', clear: 'auto' }` - Built-in memory cache with automatic clearing
- `maxRetries: 5` - Retry failed requests for resilience

**Impact**: 
- Builds complete without rate limit errors
- No cache warnings in build output
- Storyblok SDK handles request throttling automatically

### 5. Update Dependencies

Updated the following packages:
- `next`: 15.5.3 → 16.0.7
- `react` & `react-dom`: 19.1.1 → 19.2.1
- `@types/react` & `@types/react-dom`: Updated to latest
- `@next/third-parties`: Updated to support Next.js 16
- `@storyblok/react`: Updated to latest
- `react-instantsearch-nextjs`: Updated to latest
- `@netlify/plugin-nextjs`: 5.15.1 (already at latest)
- `netlify-cli`: 23.1.1 → 23.12.2
- `@netlify/functions`: 3.0.4 → 5.1.0

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

4. **Optimized Storyblok Integration**:
   - Built-in SDK rate limiting prevents API errors during builds
   - Memory cache reduces redundant API calls
   - EU region configuration ensures proper API routing

### Negative

1. **Testing Requirements**:
   - Comprehensive testing needed for all static generation paths
   - Storyblok editor access validation must be verified
   - Cache invalidation via webhooks requires validation

## References

- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19.2 Announcement](https://react.dev/blog/2025/10/01/react-19-2)
- Web Dev Team Consultation (via MCP server)

## Authors

- AI Agent (GitHub Copilot)
- Reviewed by: Web Development Team (Architecture consultation)
