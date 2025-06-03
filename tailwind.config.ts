import { type Config } from 'tailwindcss';
import decanter from 'decanter';
import tailwindContainerQueries from '@tailwindcss/container-queries';

import { base } from './tailwind/plugins/base/base';
import { fontFamily } from './tailwind/plugins/theme/fontFamily';
import { colors } from './tailwind/plugins/theme/colors';

export default {
  presets: [
    decanter,
  ],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './utilities/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: fontFamily(),
      colors: colors(),
    },
  },
  plugins: [
    tailwindContainerQueries,
    base,
  ],
} satisfies Config;
