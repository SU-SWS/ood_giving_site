'use client';

import { useEffect } from 'react';
import { Sa11y, Lang } from 'sa11y/dist/js/sa11y.esm.js';
import Sa11yLangEn from 'sa11y/dist/js/lang/en.js';
import 'sa11y/dist/css/sa11y.min.css';

const Sa11yInit = () => {
  useEffect(() => {
    // Set translations
    Lang.addI18n(Sa11yLangEn.strings);

    // Check if the custom element is already defined
    if (!customElements.get('sa11y-heading-label')) {
      // Instantiate and run Sa11y
      const sa11y = new Sa11y({
        checkRoot: 'body',
        // Customize with props
      });
    }
  }, []);

  return null;
};

export default Sa11yInit;
