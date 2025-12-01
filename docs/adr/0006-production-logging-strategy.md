# 0006: Production Logging Strategy

## Status
Accepted

## Context

The Stanford OOD Giving Site is a statically generated Next.js 15+ application deployed on Netlify with Storyblok CMS. During development and debugging, extensive logging was added to troubleshoot issues. After resolving these issues, we needed a sustainable production logging strategy that provides "just enough" information for debugging production issues without creating excessive noise.

### Key Challenges

1. **Debug Log Pollution**: Temporary debug logs (`console.log`) were scattered throughout the codebase, cluttering production logs and potentially exposing internal implementation details.

2. **Inconsistent Error Logging**: Error handling used direct `console.error()` calls without consistent formatting or context enrichment.

3. **Multiple Logging Contexts**: The application has three distinct logging contexts:
   - **Build-time**: Static site generation (SSG) with Netlify build logs
   - **Runtime**: Error boundaries and client-side errors
   - **Serverless Functions**: Netlify Functions (e.g., Algolia indexing)

4. **No Logging Service**: Production relied solely on console methods with no centralized aggregation, alerting, or analysis capabilities.

5. **Future Scalability**: Need a logging approach that can evolve from simple console methods to a full logging service (e.g., Sentry) without major refactoring.

### Architecture Constraints

- **Static-first**: 99% of pages are pre-rendered at build time
- **Aggressive caching**: 1-year edge cache with atomic deployments
- **No traditional backend**: Serverless functions only
- **Netlify deployment**: Must work with Netlify's logging infrastructure
- **Security requirements**: Stanford compliance - never log PII or secrets

## Decision

We implemented a centralized, context-aware logging strategy with a custom utility that abstracts logging implementation details and is designed for easy migration to a logging service.

### 1. Centralized Logging Utility

Created `utilities/logger.ts` with three logging methods:

```typescript
// Log errors: API failures, unhandled exceptions, critical issues
logError(message: string, error?: Error | unknown, context?: LogContext)

// Log warnings: Potential issues that don't prevent functionality
logWarn(message: string, context?: LogContext)

// Log info: Significant events only (use sparingly)
logInfo(message: string, context?: LogContext)
```

**Benefits**:
- Single point of control for logging implementation
- Easy migration to Sentry/Datadog by updating one file
- Consistent log formatting across the application
- Context enrichment for better debugging

### 2. Logging Principles

**DO Log**:
- ✅ Unhandled errors in error boundaries
- ✅ API call failures (with sanitized request/response data)
- ✅ Security events (authentication failures, validation errors)
- ✅ Build errors and warnings
- ✅ Serverless function errors
- ✅ Critical business logic failures

**DON'T Log**:
- ❌ Debug information (`console.log` for development)
- ❌ Sensitive data (passwords, API keys, PII)
- ❌ Excessive data (entire request/response bodies)
- ❌ High-frequency low-impact events
- ❌ Redundant errors (same error logged multiple times)

### 3. Context-Specific Implementation

#### Application Code (Runtime)
Uses the centralized logger utility with context enrichment:

```typescript
// Error boundaries
logError('Global error boundary caught unhandled exception', error, { 
  digest: error.digest 
});

// API calls
logError('Failed to fetch story from Storyblok API', error, { 
  path, 
  status: error?.status 
});

// Components
logError('Failed to create story component', error, { 
  storyId: currentStory?.id, 
  storyUid: currentStory?.content?._uid 
});
```

#### Build & Deployment Context
Continues using console methods with descriptive prefixes (Netlify captures these automatically):

```javascript
// Build plugins
console.error('[Storyblok Redirects Plugin] Failed to fetch redirects', error);

// Serverless functions
console.log('[Algolia] Successfully triggered content indexing task');
console.error('[Algolia] Failed to trigger indexing task:', error);
```

### 4. Removed Debug Logging

Cleaned up temporary debugging logs from:
- `app/(storyblok)/[[...slug]]/page.tsx`: Removed 11 step-by-step debug logs
- `utilities/data/getStoryData.ts`: Removed 5 API flow tracking logs
- `utilities/storyblok.tsx`: Removed 3 client initialization logs

Kept only strategic error logging in these files using the logger utility.

### 5. Documentation

Created `utilities/LOGGING.md` with:
- Complete logging strategy documentation
- What to log vs. not log guidelines
- Migration path to Sentry or other services
- Best practices for each context (build, runtime, functions)
- Security considerations

## Architecture

### Logging Flow

```
┌─────────────────────────────────────────────────────────┐
│                   Application Code                      │
├─────────────────────────────────────────────────────────┤
│  Error Boundaries → logError() → logger.ts             │
│  API Calls        → logError() → logger.ts             │
│  Components       → logError() → logger.ts             │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              utilities/logger.ts                        │
├─────────────────────────────────────────────────────────┤
│  Current: console.error/warn/log with [LEVEL] prefix   │
│  Future:  Sentry.captureException() + console.*         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Netlify Logs / Logging Service             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│            Build Plugins & Functions                    │
├─────────────────────────────────────────────────────────┤
│  console.log/error with [PluginName] prefix            │
│  → Captured by Netlify build/function logs             │
└─────────────────────────────────────────────────────────┘
```

### Error Logging Locations

1. **Error Boundaries** (`global-error.tsx`, `error.tsx`)
   - Last line of defense for unhandled exceptions
   - Logs with digest and error details

2. **API Error Handling** (`utilities/data/getStoryData.ts`)
   - Catches Storyblok API failures
   - Logs with path and status code context

3. **Component Error Handling** (`components/`)
   - Recoverable errors in EmbedScript, CreateStories
   - Logs with component-specific context

4. **Middleware** (`middleware.ts`)
   - Editor validation failures
   - Logs with pathname context

5. **Metadata Generation** (`app/(storyblok)/[[...slug]]/page.tsx`)
   - Metadata fetch failures
   - Logs with slug context

## Consequences

### Positive
- ✅ **Clean Production Logs**: Removed 19+ debug log statements
- ✅ **Consistent Logging**: All errors use the same format and utility
- ✅ **Context Enrichment**: Every log includes relevant debugging context
- ✅ **Easy Migration**: Single file to update when adding Sentry
- ✅ **Maintainable**: Clear guidelines in LOGGING.md prevent logging drift
- ✅ **Security**: Never logs sensitive data (enforced by guidelines)
- ✅ **Performance**: Minimal overhead, only logs on errors/warnings

### Trade-offs
- 🔄 **Initial Overhead**: Developers must import and use logger utility
- 📚 **Learning Curve**: Team needs to understand logging guidelines
- 🏗️ **Migration Work**: Moving to Sentry requires updating logger.ts

### Neutral
- ⚖️ **Current Implementation**: Still uses console methods (adequate for current scale)
- 🔮 **Future-Ready**: Designed for easy Sentry integration when needed

## Implementation Details

### Key Files Modified
- `utilities/logger.ts`: New centralized logging utility
- `utilities/LOGGING.md`: Complete logging documentation
- `app/global-error.tsx`: Uses `logError()` for global errors
- `app/(storyblok)/error.tsx`: Uses `logError()` for segment errors
- `utilities/data/getStoryData.ts`: Uses `logError()` for API failures
- `components/EmbedScript.tsx`: Uses `logError()` for injection failures
- `components/CreateStories.tsx`: Uses `logError()` with story context
- `middleware.ts`: Uses `logError()` for validation failures
- `netlify/functions/deploy-succeeded.mts`: Improved console logging
- `netlify/build-plugins/*`: Added descriptive prefixes

### Debug Logs Removed
- `app/(storyblok)/[[...slug]]/page.tsx`: 11 debug logs
- `utilities/data/getStoryData.ts`: 5 debug logs
- `utilities/storyblok.tsx`: 3 debug logs

### Logger API

```typescript
interface LogContext {
  [key: string]: unknown;
}

// Error logging with optional error object and context
logError(message: string, error?: Error | unknown, context?: LogContext)

// Warning logging with context
logWarn(message: string, context?: LogContext)

// Info logging (use sparingly)
logInfo(message: string, context?: LogContext)
```

## Future Enhancements

### Phase 1: Current (Implemented)
- ✅ Centralized logging utility
- ✅ Consistent error logging
- ✅ Clean debug log removal
- ✅ Documentation

### Phase 2: Logging Service Integration (When Needed)
- Install Sentry: `npm install @sentry/nextjs`
- Configure Sentry in `logger.ts`
- Add `SENTRY_DSN` environment variable
- Enable source maps for stack traces
- Set up error alerts and notifications

### Phase 3: Advanced Monitoring (Future)
- Performance monitoring (slow API calls)
- User session replay (LogRocket)
- Custom metrics and dashboards
- Log aggregation and analysis

## Monitoring

### Success Metrics
- Clean Netlify build logs (no debug noise)
- All production errors captured with context
- Zero sensitive data leaks in logs
- Fast error identification and debugging

### When to Add a Logging Service
Consider Sentry/Datadog when:
- Error volume makes console logs insufficient
- Need alerting for critical errors
- Want to track error trends over time
- Require session replay for debugging
- Team size grows and needs better coordination

## Security Considerations

### Data Sanitization
- Never log passwords, API keys, or tokens
- Sanitize user input before logging
- Redact PII (email, phone, address) when necessary
- Use context objects instead of full request/response bodies

### Access Control
- Netlify logs: Restricted to team members with deploy access
- Future logging service: Role-based access control (RBAC)
- Comply with Stanford data retention policies

## Related ADRs
- ADR-0001: Record Architecture Decisions
- ADR-0004: Storyblok Integration (API error handling)
- ADR-0005: 404 Handling and Caching (build-time logging context)

## References
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Netlify Functions Logging](https://docs.netlify.com/functions/logs/)
- [Sentry Next.js Integration](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [OWASP Logging Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
