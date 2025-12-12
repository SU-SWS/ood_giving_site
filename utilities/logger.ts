/**
 * Production logging utility
 *
 * Provides a centralized logging interface that outputs structured JSON logs
 * for easy parsing in Netlify's log viewer and potential future log aggregation.
 *
 * For now, uses console methods but is structured for easy migration
 * to a logging service like Sentry, Datadog, or similar in the future.
 *
 * **Log Format**:
 * All logs are output as JSON for structured parsing:
 * { level, message, timestamp, context, error?, stack? }
 */

interface LogContext {
  [key: string]: unknown;
}

interface ErrorInfo {
  name?: string;
  message?: string;
  stack?: string;
  status?: number;
  code?: string;
  cause?: unknown;
}

/**
 * Extract useful information from an error object
 */
const extractErrorInfo = (error: unknown): ErrorInfo | undefined => {
  if (!error) return undefined;

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      // Capture any additional properties that might be on the error
      ...('status' in error ? { status: (error as any).status } : {}),
      ...('code' in error ? { code: (error as any).code } : {}),
      ...('cause' in error ? { cause: error.cause } : {}),
    };
  }

  // Handle non-Error objects (like Storyblok API error responses)
  if (typeof error === 'object') {
    return error as ErrorInfo;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return { message: error };
  }

  return { message: String(error) };
};

/**
 * Get environment context for logs
 */
const getEnvironmentContext = (): Record<string, string | undefined> => ({
  buildId: process.env.BUILD_ID,
  deployContext: process.env.CONTEXT,
  nodeEnv: process.env.NODE_ENV,
});

/**
 * Format log entry as structured JSON
 */
const formatLogEntry = (
  level: 'ERROR' | 'WARN' | 'INFO',
  message: string,
  context?: LogContext,
  error?: unknown,
) => {
  const entry: Record<string, unknown> = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...getEnvironmentContext(),
  };

  if (context && Object.keys(context).length > 0) {
    entry.context = context;
  }

  const errorInfo = extractErrorInfo(error);
  if (errorInfo) {
    entry.error = errorInfo;
  }

  return entry;
};

/**
 * Log an error with optional context
 * Use for unexpected errors, API failures, and critical issues
 *
 * @param message - Human-readable description of what went wrong
 * @param error - The error object (Error, string, or API response)
 * @param context - Additional context (path, slug, component name, etc.)
 *
 * @example
 * logError('Failed to fetch story', error, { path: '/about', status: 500 });
 */
export const logError = (message: string, error?: Error | unknown, context?: LogContext) => {
  const entry = formatLogEntry('ERROR', message, context, error);

  // Output as JSON for structured log parsing
  console.error(JSON.stringify(entry));

  // Also output the stack trace separately for readability in dev
  if (process.env.NODE_ENV === 'development' && error instanceof Error && error.stack) {
    console.error(error.stack);
  }
};

/**
 * Log a warning with optional context
 * Use for potential issues that don't prevent functionality
 *
 * @param message - Human-readable description of the warning
 * @param context - Additional context for debugging
 *
 * @example
 * logWarn('Deprecated API usage detected', { component: 'MyComponent' });
 */
export const logWarn = (message: string, context?: LogContext) => {
  const entry = formatLogEntry('WARN', message, context);
  console.warn(JSON.stringify(entry));
};

/**
 * Log informational message (use sparingly in production)
 * Only for significant events like successful deploys
 *
 * @param message - Human-readable description of the event
 * @param context - Additional context
 *
 * @example
 * logInfo('Build completed successfully', { pageCount: 341 });
 */
export const logInfo = (message: string, context?: LogContext) => {
  const entry = formatLogEntry('INFO', message, context);
  console.log(JSON.stringify(entry));
};

/**
 * Create a child logger with preset context
 * Useful for adding consistent context across related log calls
 *
 * @param baseContext - Context that will be included in all log calls
 *
 * @example
 * const pageLogger = createLogger({ route: '/about', slug: 'about' });
 * pageLogger.error('Failed to render', error);
 */
export const createLogger = (baseContext: LogContext) => ({
  error: (message: string, error?: Error | unknown, context?: LogContext) =>
    logError(message, error, { ...baseContext, ...context }),
  warn: (message: string, context?: LogContext) =>
    logWarn(message, { ...baseContext, ...context }),
  info: (message: string, context?: LogContext) =>
    logInfo(message, { ...baseContext, ...context }),
});