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

  const injectContent = useCallback(async () => {
    if (!html || !containerRef.current) return;
    const container = containerRef.current;

    try {
      // Create a 'tiny' document and parse the html string.
      // https://developer.mozilla.org/en-US/docs/Web/API/DocumentminiDom
      const miniDom = document.createRange().createContextualFragment(html);

      /**
       * Pull scripts out before inserting. createContextualFragment runs them on insert,
       * so an inline script that depends on an external src script
       * (e.g. Double the Donation's ddplugin.js) would fire before that script
       * finished loading and throw "<global> is not defined".
       */
      const scripts = Array.from(miniDom.querySelectorAll('script'));
      scripts.forEach((s) => s.remove());

      // Inject the markup first, then run scripts in document order, awaiting
      // each external (src) script so later inline scripts see its globals.
      container.replaceChildren(miniDom);

      for (const old of scripts) {
        const script = document.createElement('script');
        for (const { name, value } of old.attributes) {
          script.setAttribute(name, value);
        }
        script.textContent = old.textContent;

        const loaded = script.src
          ? new Promise((resolve, reject) => {
              script.onload = resolve;
              script.onerror = reject;
            })
          : Promise.resolve();

        container.appendChild(script);
        await loaded;
      }
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
