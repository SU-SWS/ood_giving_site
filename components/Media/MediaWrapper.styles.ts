import { cnb } from 'cnbuilder';
import { type StoryImageWidthType } from '@/components/Image';
import { type TextAlignType } from '@/components/Typography';
import { lightPageBgColors, type LightPageBgColorsType } from '@/utilities/datasource';

export const root = 'relative flex';
export const wrapper = (imageWidth: StoryImageWidthType) => cnb('mx-auto', imageWidth === 'su-w-full' && 'w-full');

// Caption component styles
export const captionWrapper = 'mt-0 caption';
export const caption = (
  isCard: boolean,
  imageWidth: StoryImageWidthType,
  captionBgColor: LightPageBgColorsType,
  captionAlign: TextAlignType,
) => cnb(
  '*:*:leading-display *:*:xl:leading-snug first:*:*:mt-0',
  isCard ? 'rs-px-0 pt-08em rs-pb-2' : 'pt-06em',
  lightPageBgColors[captionBgColor],
  {
    'text-center mx-auto': captionAlign === 'center' || imageWidth === 'su-w-full',
    'text-left': captionAlign === 'left' && imageWidth !== 'su-w-full',
    'text-right mr-0': captionAlign === 'right' && imageWidth !== 'su-w-full',
  },
);
