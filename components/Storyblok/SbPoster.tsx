import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { CreateBloks } from '@/components/CreateBloks';
import { Poster } from '@/components/Poster';
import { RichText } from '@/components/RichText';
import { type HeadingType } from '@/components/Typography';
import { type VisibleVerticalType } from '@/components/Image';
import { hasRichText } from '@/utilities/hasRichText';
import { type AllCardBgColorType, type LightPageBgColorType, type GradientOverlayType } from '@/utilities/datasource';
import { getNumBloks } from '@/utilities/getNumBloks';
import { type SbImageType } from './Storyblok.types';

type SbPosterProps = {
  blok: SbBlokData & {
    headline?: string;
    bodyText?: StoryblokRichtext;
    ctaLink?: SbBlokData[];
    // Image
    image?: SbImageType;
    visibleVertical?: VisibleVerticalType;
    overlay?: GradientOverlayType;
    // Options
    cardBackgroundColor?: AllCardBgColorType;
    cardPosition?: 'left' | 'right';
    backgroundColor?: LightPageBgColorType; // Background color next to the overhang of the card so it matches the section below
    headingLevel?: HeadingType;
  };
}

export const SbPoster = ({ blok }: SbPosterProps) => {
  const {
    headline,
    bodyText,
    ctaLink,
    image: { filename, alt } = {},
    visibleVertical = 'center',
    overlay,
    cardBackgroundColor = 'palo-verde-dark',
    cardPosition = 'right',
    backgroundColor = 'white',
    headingLevel = 'h2',
  } = blok;

  const isDarkText = cardBackgroundColor === 'fog-light';
  const BodyText = hasRichText(bodyText) ? <RichText wysiwyg={bodyText} baseFontSize="base23" textColor={isDarkText ? 'black' : 'white'} className="first:*:mt-0" /> : null;
  const Cta = getNumBloks(ctaLink) ? <CreateBloks blokSection={ctaLink} /> : null;

  return (
    <Poster
      {...storyblokEditable(blok)}
      headline={headline}
      bodyText={BodyText}
      ctaLink={Cta}
      filename={filename}
      alt={alt}
      overlay={overlay}
      visibleVertical={visibleVertical}
      bgColor={cardBackgroundColor}
      sectionBgColor={backgroundColor}
      cardPosition={cardPosition || 'right'}
      headingLevel={headingLevel || 'h2'}
      isDarkText={isDarkText}
    />
  );
};
