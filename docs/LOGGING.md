# Production Logging Strategy

## Overview

This document outlines the production logging strategy for the Stanford OOD Giving Site. The goal is to log "just enough" to be useful for debugging production issues without creating excessive noise.

## Logging Utility

All application code should use the logging utility at `utilities/logger.ts` instead of direct console methods. This provides:

- Centralized logging interface
- Easy migration to logging services (Sentry, Datadog, etc.)
- Consistent log formatting
- Context enrichment

## What to Log

### ✅ DO Log

- **Unhandled Errors**: Any exceptions caught in error boundaries
- **API Failures**: Failed calls to Storyblok or external services
- **Security Events**: Authentication failures, validation errors
- **Build Errors**: Errors during static site generation
- **Serverless Function Errors**: Errors in Netlify functions
- **Critical Business Logic Failures**: Issues that impact user experience

### ❌ DON'T Log

- **Verbose Traces**: Routine fetch operations, cache hits, component renders
- **Sensitive Data**: Never log passwords, API keys, PII
- **Excessive Data**: Avoid logging entire request/response bodies
- **High-Frequency Low-Impact Events**: Routine operations that don't indicate problems
- **Redundant Errors**: The same error logged multiple times

## Where to Log

### Application Code

- **Error Boundaries** (`global-error.tsx`, `error.tsx`): Essential for catching unhandled exceptions
- **API Calls** (`utilities/data/*.ts`): Log failures with context (endpoint, status, error)
- **Component Error Catches**: Only when handling recoverable errors

### Build & Deployment

- **Netlify Build Plugins**: Log errors and warnings during build process
- **Serverless Functions** (`netlify/functions/*.mts`): Log function errors and critical events

## Logging Methods

### Current Implementation

```typescript
import { logError, logWarn, logInfo } from '@/utilities/logger';

// Log an error with context
logError('Failed to fetch story', error, { path: '/some-page', status: 404 });

// Log a warning
logWarn('Deprecated API usage detected', { component: 'MyComponent' });

// Log important events (use sparingly)
logInfo('Algolia indexing completed', { recordCount: 150 });
```

### Build & Deployment Context

Netlify build plugins and serverless functions should continue using `console.log` and `console.error` as Netlify captures these automatically:

```javascript
// In build plugins and serverless functions
console.log('[PluginName] Operation successful');
console.error('[PluginName] Operation failed:', error);
```

Use descriptive prefixes (e.g., `[Algolia]`, `[Storyblok Redirects Plugin]`) for easy filtering in Netlify logs.

## Best Practices

1. **Always Include Context**: Add relevant information (user ID, route, component name)
2. **Sanitize Data**: Never log sensitive information
3. **Be Specific**: Use descriptive error messages
4. **Use Appropriate Level**: Error for failures, warn for potential issues, info for significant events

## Related Documentation

- [Netlify Documentation](https://docs.netlify.com/functions/logs/)
