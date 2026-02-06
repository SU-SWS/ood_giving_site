import { type Config } from 'tailwindcss';
import decanter from 'decanter';
import tailwindContainerQueries from '@tailwindcss/container-queries';

import { base } from './tailwind/plugins/base/base.ts';
import { aria } from './tailwind/plugins/theme/aria.ts';
import { fontFamily } from './tailwind/plugins/theme/fontFamily.ts';
import { keyframes } from './tailwind/plugins/theme/keyframes.ts';

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
      aria: aria(),
      fontFamily: fontFamily(),
      keyframes: keyframes(),
    },
  },
  plugins: [
    tailwindContainerQueries,
    base,
  ],
} satisfies Config;
