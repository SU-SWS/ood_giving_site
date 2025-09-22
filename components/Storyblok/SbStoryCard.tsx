import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { StoryCard } from '@/components/StoryCard';
import { type HeadingType } from '@/components/Typography';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { type SbImageType, type SbLinkType } from './Storyblok.types';
import { type LightPageBgColorType } from '@/utilities/datasource';

/**
 * This is the Story Card component with manaually entered content
 * For Story Card that reference a Storyblok story, see the `SbStoryPicker` component instead.
 */
export type SbStoryCardProps = {
  blok: SbBlokData & {
    headline?: string;
    teaser?: string;
    link?: SbLinkType;
    // Image
    image?: SbImageType;
    showImage?: boolean;
    visibleHorizontal?: VisibleHorizontalType;
    visibleVertical?: VisibleVerticalType;
    // Options
    orientation?: 'vertical' | 'horizontal';
    backgroundColor?: LightPageBgColorType;
    headingLevel?: HeadingType;
  };
}

export const SbStoryCard = ({ blok }: SbStoryCardProps) => {
  const {
    headline,
    teaser,
    link,
    image: { filename, alt, focus } = {},
    showImage,
    visibleHorizontal = 'center',
    visibleVertical = 'center',
    orientation = 'vertical',
    backgroundColor,
    headingLevel,
  } = blok;

  // If no orientation is selected, default to vertical
  const isVertical = orientation === 'vertical' || !orientation;

  return (
    <StoryCard
      {...storyblokEditable(blok)}
      headline={headline}
      teaser={teaser}
      link={link}
      filename={showImage ? filename : ''}
      alt={showImage ? alt : ''}
      focus={showImage ? focus : ''}
      visibleHorizontal={showImage ? visibleHorizontal : undefined}
      visibleVertical={showImage ? visibleVertical : undefined}
      isVertical={isVertical}
      bgColor={backgroundColor || 'fog-light'}
      headingLevel={headingLevel || 'h3'}
    />
  );
};
