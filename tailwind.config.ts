import { type Config } from 'tailwindcss';
// import path from 'path';
import decanter from 'decanter';
import tailwindContainerQueries from '@tailwindcss/container-queries';

// Path to custom Tailwind plugins for Directory
// const dir = path.resolve(__dirname, 'tailwind/plugins');

export default {
  presets: [
    decanter,
  ],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './utilities/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    tailwindContainerQueries,
  ],
} satisfies Config;
