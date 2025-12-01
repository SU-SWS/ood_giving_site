/**
 * Production logging utility
 *
 * Provides a centralized logging interface that can be configured
 * to use different logging backends (console, Sentry, etc.)
 *
 * For now, uses console methods but is structured for easy migration
 * to a logging service like Sentry in the future.
 */

interface LogContext {
  [key: string]: unknown;
}

/**
 * Log an error with optional context
 * Use for unexpected errors, API failures, and critical issues
 */
export const logError = (message: string, error?: Error | unknown, context?: LogContext) => {
  // In production with Sentry: Sentry.captureException(error, { contexts: context });
  console.error(`[ERROR] ${message}`, error, context);
};

/**
 * Log a warning with optional context
 * Use for potential issues that don't prevent functionality
 */
export const logWarn = (message: string, context?: LogContext) => {
  // In production with Sentry: Sentry.captureMessage(message, 'warning', { contexts: context });
  console.warn(`[WARN] ${message}`, context);
};

/**
 * Log informational message (use sparingly in production)
 * Only for significant events like successful deploys
 */
export const logInfo = (message: string, context?: LogContext) => {
  // In production with Sentry: Sentry.captureMessage(message, 'info', { contexts: context });
  console.log(`[INFO] ${message}`, context);
};