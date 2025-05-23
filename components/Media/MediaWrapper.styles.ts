import { cnb } from 'cnbuilder';
import { type StoryImageWidthType } from '@/components/Image';

export const root = 'relative flex';
export const wrapper = (imageWidth: StoryImageWidthType) => cnb('mx-auto', imageWidth === 'su-w-full' && 'w-full');

// Caption component styles
export const captionWrapper = 'mt-0';
export const caption = '*:*:leading-display *:*:xl:leading-snug max-w-prose-wide first:*:*:mt-0';
