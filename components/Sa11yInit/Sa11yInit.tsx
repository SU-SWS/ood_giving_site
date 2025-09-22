'use client';

import { useEffect } from 'react';
import 'sa11y/dist/css/sa11y.min.css';

export const Sa11yInit: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (async () => {
        /**
         * Dynamically import the Sa11y library and dependencies to avoid "ReferenceError: HTMLElement is not defined".
         * The error occurs because the Sa11y library or its imports rely on the HTMLElement API,
         * which is not available in the Node.js runtime where the server-side rendering (SSR) of Next.js occurs.
         * Simply using useEffect with the window !== 'undefined' check
         * does not prevent the code from being imported during the SSR phase.
         */
        const { Sa11y, Lang } = await import('sa11y/dist/js/sa11y.esm.js');
        const { default: Sa11yLangEn } = await import('sa11y/dist/js/lang/en.js');

        // Set translations
        Lang.addI18n(Sa11yLangEn.strings);

        // Check if the custom element is already defined
        if (!customElements.get('sa11y-heading-label')) {
          // Instantiate and run Sa11y
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const sa11y = new Sa11y({
            checkRoot: 'body',
            // Ignore all storyblok overlay elements
            containerIgnore: "[class^='storyblok__']",
          });
        }
      })();
    }
  }, []);

  return null;
};
