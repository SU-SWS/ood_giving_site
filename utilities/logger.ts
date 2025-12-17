/**
 * Production logging utility
 *
 * Provides a centralized logging interface that can be configured
 * to use different logging backends (console, Sentry, etc.)
 *
 */

interface LogContext {
  [key: string]: unknown;
}

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
  console.warn(`[WARN] ${message}`, formatContext(context));
};

/**
 * Log informational message (use sparingly in production)
 * Only for significant events like Storyblok client initialization
 */
export const logInfo = (message: string, context?: LogContext) => {
  console.log(`[INFO] ${message}`, formatContext(context));
};