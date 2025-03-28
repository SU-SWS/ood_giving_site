export const sbStripSlugURL = (url: string): string => {
  // If not a string return the original URL.
  if (typeof url !== 'string') {
    return url;
  }

  // If the URL is empty, return an empty string.
  if (!url) {
    return '';
  }

  // Remove both leading and trailing slashes from the URL if exist.
  const urlNoSlashOnEnds = url.replace(/^\/|\/$/g, '');

  /**
   * Occasionally the cached_url for the homepage still shows up as
   * 'home' so adding the last check just in case.
   */
  if (urlNoSlashOnEnds === 'home') {
    return '/';
  }

  const parts = urlNoSlashOnEnds?.split('/');

  // If all the array items are empty strings, return a slash.
  if (parts.every(part => part === '')) {
    return '/';
  }

  const strippedUrl = parts.join('/');

  // Make sure the return URL has a leading slash.
  return strippedUrl.startsWith('/') ? strippedUrl : `/${strippedUrl}`;
};
