import { cnb } from 'cnbuilder';
import { type TextAlignType } from '@/components/Typography';
import { lightPageBgColors, type LightPageBgColorType } from '@/utilities/datasource';

// Image Width (from Storyblok)
export const storyImageWidths = {
  'su-w-full': '', // This is labeled as the edge-to-edge option
  'centered-container': '',
  'su-w-story': 'lg:basis-8/12',
  'su-w-inset': 'sm:basis-10/12 md:basis-8/12 lg:basis-7/12 xl:basis-6/12 2xl:basis-5/12',
  'fit-container': '',
};
export type StoryImageWidthType = keyof typeof storyImageWidths;

// Video Widths (from Storyblok)
export const videoWidths = {
  site: 'w-full',
  inset: 'sm:basis-10/12 md:basis-8/12 lg:basis-7/12 xl:basis-6/12',
  story: 'lg:basis-8/12',
  'fit-parent': 'w-full',
};
export type VideoWidthType = keyof typeof videoWidths;

export const mediaWidths = {
  ...storyImageWidths,
  ...videoWidths,
};
export type MediaWidthType = StoryImageWidthType | VideoWidthType;

export const root = 'relative flex';
export const wrapper = 'mx-auto w-full';

// Caption component styles
export const captionWrapper = 'mt-0 caption';
export const caption = (
  isCard: boolean,
  mediaWidth: MediaWidthType,
  captionBgColor: LightPageBgColorType,
  captionAlign: TextAlignType,
) => cnb(
  '*:*:leading-display *:*:xl:leading-snug first:*:*:mt-0',
  isCard ? 'rs-px-0 pt-08em rs-pb-2' : 'pt-06em',
  lightPageBgColors[captionBgColor],
  {
    'text-center mx-auto': captionAlign === 'center' || mediaWidth === 'su-w-full',
    'text-left': captionAlign === 'left' && mediaWidth !== 'su-w-full',
    'text-right mr-0': captionAlign === 'right' && mediaWidth !== 'su-w-full',
  },
);
