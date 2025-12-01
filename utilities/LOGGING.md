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

- **Debug Information**: Remove all `console.log` used during development
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

## Future Enhancements

### Migration to Logging Service

When ready to implement a dedicated logging service:

1. **Choose a Service**: Sentry recommended for error tracking (good Next.js integration)
2. **Install SDK**: `npm install @sentry/nextjs`
3. **Configure**: Update `utilities/logger.ts` to use Sentry SDK
4. **Environment Variables**: Add `SENTRY_DSN` and other config
5. **Testing**: Verify logs appear in service dashboard

### Example Sentry Migration

```typescript
// utilities/logger.ts
import * as Sentry from '@sentry/nextjs';

export const logError = (message: string, error?: Error | unknown, context?: LogContext) => {
  Sentry.captureException(error, {
    contexts: { custom: context },
    tags: { message },
  });
  // Keep console.error for Netlify logs
  console.error(`[ERROR] ${message}`, error, context);
};
```

## Best Practices

1. **Always Include Context**: Add relevant information (user ID, route, component name)
2. **Sanitize Data**: Never log sensitive information
3. **Be Specific**: Use descriptive error messages
4. **Use Appropriate Level**: Error for failures, warn for potential issues, info for significant events
5. **Test Locally**: Verify logging doesn't impact performance
6. **Review Regularly**: Periodically review logs to ensure quality and relevance

## Monitoring

### Netlify Built-in Logs

- **Build Logs**: Available in Netlify UI after each deployment
- **Function Logs**: Real-time logs for serverless functions
- **Deploy Logs**: Track deployment status and issues

### Future Alerting

When using a logging service:

- Set up alerts for critical errors
- Configure error rate thresholds
- Enable Slack/email notifications
- Track error trends over time

## Related Documentation

- [AGENTS.md](/AGENTS.md) - AI agent instructions and architecture overview
- [Netlify Documentation](https://docs.netlify.com/functions/logs/)
- [Sentry Next.js Integration](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
