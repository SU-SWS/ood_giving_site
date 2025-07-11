import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { StoryCard } from '@/components/StoryCard';
import { type HeadingType } from '@/components/Typography';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { type SbImageType, type SbLinkType } from '../Storyblok.types';
import { type LightPageBgColorType } from '@/utilities/datasource';

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
    backgroundColor = 'white',
    headingLevel = 'h3',
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
      heroImage: { filename, alt, focus } = {},
      shortTitle,
      teaser,
      cardImage: { filename: cardFilename, alt: cardAlt, focus: cardFocus } = {},
    } = {},
    full_slug,
  } = firstStory || {};

  const storyPickerLink: SbLinkType = { linktype: 'story', cached_url: full_slug };

  // If no orientation is selected, default to vertical
  const isVertical = orientation === 'vertical' || !orientation;

  return (
    <StoryCard
      {...storyblokEditable(blok)}
      headline={shortTitle || title}
      teaser={teaser || intro}
      link={storyPickerLink}
      filename={!hideImage ? cardFilename || filename : ''}
      alt={!hideImage ? cardAlt || alt : ''}
      focus={!hideImage ? cardFocus || focus : ''}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      isVertical={isVertical}
      bgColor={backgroundColor}
      headingLevel={headingLevel || 'h3'}
    />
  );
};
