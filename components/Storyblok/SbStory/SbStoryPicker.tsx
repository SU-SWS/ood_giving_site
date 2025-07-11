import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { StoryCard } from '@/components/StoryCard';
import { type HeadingType } from '@/components/Typography';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { type SbImageType, type SbLinkType } from '../Storyblok.types';
import { type LightPageBgColorType } from '@/utilities/datasource';

/**
 * This Story Picker component renders a Story Card using fields from the story that it references.
 * For Story Card that has manually entered content, see the `SbStoryCard` component instead.
 */

// The fields used from the Story page type
type StoryContentType = {
  title?: string;
  intro?: string;
  heroImage?: SbImageType;
  shortTitle?: string;
  teaser?: string;
  cardImage?: SbImageType;
};

type StoryItemType = {
  content?: StoryContentType;
  full_slug?: string;
};

export type SbStoryPickerProps = {
  blok: SbBlokData & {
    story?: StoryItemType | StoryItemType[];
    orientation?: unknown;
    hideImage?: boolean;
    image?: SbImageType;
    link?: SbLinkType;
    backgroundColor?: LightPageBgColorType;
    headingLevel?: HeadingType;
    visibleHorizontal?: VisibleHorizontalType;
    visibleVertical?: VisibleVerticalType;
  };
};

export const SbStoryPicker = ({
  blok: {
    story,
    hideImage,
    orientation = 'vertical',
    backgroundColor,
    headingLevel,
    visibleHorizontal = 'center',
    visibleVertical = 'center',
  },
  blok,
}: SbStoryPickerProps) => {
  // Get the first story if it's an array (Storyblok reference field type), or use the story (single-option field) directly
  const firstStory = Array.isArray(story) ? story[0] : story;
  if (!firstStory) {
    return null;
  }

  const {
    content: {
      title,
      intro,
      heroImage: { filename: heroFilename, alt: heroAlt, focus: heroFocus } = {},
      shortTitle,
      teaser,
      cardImage: { filename: cardFilename, alt: cardAlt, focus: cardFocus } = {},
    } = {},
    full_slug,
  } = firstStory || {};

  const storyPickerLink: SbLinkType = { linktype: 'story', cached_url: full_slug };

  // If no orientation is selected, default to vertical
  const isVertical = orientation === 'vertical' || !orientation;

  // Use card image if available, otherwise fallback to hero image
  const imageData = cardFilename
    ? { filename: cardFilename, alt: cardAlt, focus: cardFocus }
    : { filename: heroFilename, alt: heroAlt, focus: heroFocus };

  return (
    <StoryCard
      {...storyblokEditable(blok)}
      headline={shortTitle || title}
      teaser={teaser || intro}
      link={storyPickerLink}
      filename={!hideImage ? imageData.filename : ''}
      alt={!hideImage ? imageData.alt : ''}
      focus={!hideImage ? imageData.focus : ''}
      visibleHorizontal={!hideImage ? visibleHorizontal : undefined}
      visibleVertical={!hideImage ? visibleVertical : undefined}
      isVertical={isVertical}
      bgColor={backgroundColor || 'fog-light'}
      headingLevel={headingLevel || 'h3'}
    />
  );
};
