/**
 * @param str Any string
 * @returns A string that can be used as a URL slug or id
 */
export const slugify = (str: string = '') => str
  .toLowerCase()
  .replace(/[\s]+/g, '-') // Replace any whitespace with a single dash
  .replace(/[^a-z0-9-]+/ig, '') // Remove all non-alphanumeric characters except dashes
  .replace(/^-+|-+$/g, ''); // Trim any leading or trailing dashes
