'use client';
import { useCallback } from 'react';
import { getCookie, setCookie } from 'cookies-next/client';

export type UTMs = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

const COOKIE_NAME = 'SU-GC-UTMs';

const useUTMs = () => {
  /**
   * Returns UTMs from cookie.
   */
  const getUTMsFromCookie = useCallback((): Partial<UTMs> | null => {
    const cookie = getCookie(COOKIE_NAME);
    return cookie ? JSON.parse(String(cookie)) : null;
  }, []);

  /**
   * Sets the tracking cookie.
   */
  const setUTMCookie = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || undefined;
    const utm_medium = urlParams.get('utm_medium') || undefined;
    const utm_campaign = urlParams.get('utm_campaign') || undefined;
    const utm_content = urlParams.get('utm_content') || undefined;
    const utm_term = urlParams.get('utm_term') || undefined;
    const UTMs = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    };

    // UTM source is a required param for GA to work.
    if (utm_source) {
      setCookie(COOKIE_NAME, UTMs, {
        path: '/',
        domain: window.location.hostname,
        secure: window.location.protocol === 'https',
        httpOnly: false,
        sameSite: 'strict',
      });
    }
  }, []);

  /**
   * Deletes the tracking cookie.
   */
  const deleteUTMCookie = useCallback(() => {
    setCookie(COOKIE_NAME, '', {
      path: '/',
      domain: window.location.hostname,
      secure: window.location.protocol === 'https',
      httpOnly: false,
      sameSite: 'strict',
      expires: new Date(0),
    });
  }, []);

  /**
   *
   * @param url URL to add UTMs to
   * @returns URL string with UTMs added to searchParams
   */
  const addUTMsToUrl = useCallback((url: string) => {
    const urlObj = new URL(url);
    const utms = getUTMsFromCookie();
    if (!utms) return url;
    const searchParams = new URLSearchParams(urlObj.search);
    Object.entries(utms).forEach(([key, value]) => {
      // Only append defined, non-empty values
      if (value !== undefined && value !== null && String(value).length > 0) {
        searchParams.append(key, String(value));
      }
    });
    urlObj.search = searchParams.toString();
    return urlObj.toString();
  }, [getUTMsFromCookie]);

  return {
    cookieName: COOKIE_NAME,
    getUTMsFromCookie,
    setUTMCookie,
    deleteUTMCookie,
    addUTMsToUrl,
  };
};

export default useUTMs;
