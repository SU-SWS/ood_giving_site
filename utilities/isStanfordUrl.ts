/**
 * Returns true when `url` is a URL under the stanford.edu domain.
 * Accepts multiple subdomain levels.
 *
 * Examples that evaluate to `true`:
 * - `https://stanford.edu`
 * - `http://stanford.edu`
 * - `https://news.stanford.edu`
 * - `https://gsb.stanford.edu/about`
 * - `https://www.gsb.stanford.edu`
 *
 * Examples that evaluate to `false`:
 * - `/internal/path` (relative path)
 * - `https://example.com/?q=stanford.edu` (not the host)
 * - `https://notstanford.edu` (different hostname)
 * - `https://stanford.edu.bad.com`
 *
 * @param url - URL string to test
 * @returns boolean - `true` if the input is a stanford.edu URL, otherwise `false`
 */
export const isStanfordUrl = (url: string) => {
  const stanfordRegex = /^(?:https?:\/\/)?(?:[A-Za-z0-9-]+\.)*stanford\.edu(?::\d+)?(?:\/|$)/i;
  return stanfordRegex.test(url);
};
