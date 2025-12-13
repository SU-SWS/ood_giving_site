/**
 * Production logging utility
 *
 * Provides a centralized logging interface that can be configured
 * to use different logging backends (console, Sentry, etc.)
 *
 * For now, uses console methods but is structured for easy migration
 * to a logging service like Sentry in the future.
 *
 * Set DEBUG_LOGGING=true environment variable to enable verbose debug logging.
 */

interface LogContext {
  [key: string]: unknown;
}

/** Check if debug logging is enabled */
const isDebugEnabled = () => process.env.DEBUG_LOGGING === 'true';

/** Format context for consistent log output */
const formatContext = (context?: LogContext): string => {
  if (!context || Object.keys(context).length === 0) return '';
  try {
    return JSON.stringify(context);
  } catch {
    return String(context);
  }
};

/**
 * Log an error with optional context
 * Use for unexpected errors, API failures, and critical issues
 */
export const logError = (message: string, error?: Error | unknown, context?: LogContext) => {
  // In production with Sentry: Sentry.captureException(error, { contexts: context });
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  console.error(`[ERROR] ${message}`, {
    error: errorMessage,
    stack: errorStack,
    ...context,
  });
};

/**
 * Log a warning with optional context
 * Use for potential issues that don't prevent functionality
 */
export const logWarn = (message: string, context?: LogContext) => {
  // In production with Sentry: Sentry.captureMessage(message, 'warning', { contexts: context });
  console.warn(`[WARN] ${message}`, formatContext(context));
};

/**
 * Log informational message (use sparingly in production)
 * Only for significant events like successful deploys
 */
export const logInfo = (message: string, context?: LogContext) => {
  // In production with Sentry: Sentry.captureMessage(message, 'info', { contexts: context });
  console.log(`[INFO] ${message}`, formatContext(context));
};

/**
 * Log debug message (only when DEBUG_LOGGING=true)
 * Use for verbose tracing during development or debugging production issues
 */
export const logDebug = (message: string, context?: LogContext) => {
  if (!isDebugEnabled()) return;
  console.log(`[DEBUG] ${message}`, formatContext(context));
};