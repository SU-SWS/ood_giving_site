import { type Config } from 'tailwindcss';
import decanter from 'decanter';
import tailwindContainerQueries from '@tailwindcss/container-queries';

import { base } from './tailwind/plugins/base/base';
import { aria } from './tailwind/plugins/theme/aria';
import { fontFamily } from './tailwind/plugins/theme/fontFamily';
import { colors } from './tailwind/plugins/theme/colors';
import { keyframes } from './tailwind/plugins/theme/keyframes';
import { screens } from './tailwind/plugins/theme/screens';

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
    screens: screens(),
    extend: {
      aria: aria(),
      fontFamily: fontFamily(),
      colors: colors(),
      keyframes: keyframes(),
    },
  },
  plugins: [
    tailwindContainerQueries,
    base,
  ],
} satisfies Config;
