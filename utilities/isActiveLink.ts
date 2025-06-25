/**
 * Removes leading and trailing slashes from a URL or slug
 * @param urlOrSlug - The URL or full slug string to sanitize
 * @returns The sanitized string without leading or trailing slashes
 */
export const sanitizeUrlSlug = (urlOrSlug?: string): string => {
  if (!urlOrSlug) return '';
  return urlOrSlug.replace(/^\/|\/$/g, '');
};

/**
 * Determines if the current page is active based on URL comparison
 * @param currentSlug - The current page full slug
 * @param path - The URL path to compare against
 * @returns Boolean indicating if the current page matches the link
 */
export const isActiveLink = (currentSlug?: string, path?: string): boolean => {
  if (!currentSlug || !path) return false;

  const sanitizedSlug = sanitizeUrlSlug(currentSlug);
  const sanitizedUrl = sanitizeUrlSlug(path);

  return sanitizedSlug === sanitizedUrl;
};
