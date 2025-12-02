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

## Security Considerations

### Data Sanitization
- Never log passwords, API keys, or tokens
- Sanitize user input before logging
- Redact PII (email, phone, address) when necessary
- Use context objects instead of full request/response bodies

## Related ADRs
- ADR-0001: Record Architecture Decisions
- ADR-0004: Storyblok Integration (API error handling)
- ADR-0005: 404 Handling and Caching (build-time logging context)

## References
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Netlify Functions Logging](https://docs.netlify.com/functions/logs/)
- [Sentry Next.js Integration](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [OWASP Logging Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
