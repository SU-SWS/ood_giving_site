'use client';

import { useRef, useEffect, useCallback } from 'react';
import { logError } from '@/utilities/logger';

/**
 * For embedding HTML content and third-party scripts.
 *
 * Credit where credit is deserved.
 * @see: https://github.com/christo-pr/dangerously-set-html-content
 *
 * Use this widget with caution. There are no safeguards on what it can do. It
 * is also not good practice to inject and manipulate the page outside of
 * React as that can lead to irregularities and troubles.
 */

type EmbedScriptProps = React.HTMLAttributes<HTMLDivElement> & {
  script?: string;
}

export const EmbedScript = ({
  script: html,
  className,
  ...props
}: EmbedScriptProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const injectContent = useCallback(() => {
    if (!html || !containerRef.current) return;

    try {
      // Create a 'tiny' document and parse the html string.
      // https://developer.mozilla.org/en-US/docs/Web/API/DocumentminiDom
      const miniDom = document.createRange().createContextualFragment(html);

      // Force the scripts in the embed script field to load sync.
      const scripts = miniDom.querySelectorAll('script');
      for (const script of scripts) {
        if (script.src && script.src.length > 0) {
          script.async = false;
          script.defer = false;
        }
      }

      // Clear the container and append new content
      containerRef.current.replaceChildren(miniDom);
    } catch (error) {
      logError('EmbedScript failed to inject content', error);
    }
  }, [html]);

  useEffect(() => {
    injectContent();
  }, [injectContent]);

  return (
    <div ref={containerRef} className={className} {...props} />
  );
};
