import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { BasicCard } from '@/components/BasicCard';
import { CreateBloks } from '@/components/CreateBloks';
import { type HeadingType, type TextAlignType } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { hasRichText } from '@/utilities/hasRichText';
import { type SbImageType } from './Storyblok.types';
import { type CardBgColorType } from '@/utilities/datasource';
import { getNumBloks } from '@/utilities/getNumBloks';

export type SbBasicCardProps = {
  blok: SbBlokData & {
    superheadline?: string;
    headline?: string;
    content?: StoryblokRichtext;
    ctaLink?: SbBlokData[];
    // Image
    image?: SbImageType;
    showImage?: boolean;
    imageAspectRatio?: '1x1' | '3x2';
    visibleHorizontal?: VisibleHorizontalType;
    visibleVertical?: VisibleVerticalType;
    // Options
    orientation?: 'vertical' | 'horizontal';
    backgroundColor?: CardBgColorType;
    largeHeading?: boolean;
    isSansHeading?: boolean;
    largeCardPadding?: boolean;
    textAlign?: TextAlignType;
    headingLevel?: HeadingType;
  };
}

export const SbBasicCard = ({ blok }: SbBasicCardProps) => {
  const {
    superheadline,
    headline,
    content,
    ctaLink,
    image: { filename, focus } = {},
    showImage,
    imageAspectRatio = '1x1',
    visibleHorizontal = 'center',
    visibleVertical = 'center',
    orientation = 'vertical',
    backgroundColor = 'white',
    largeHeading,
    isSansHeading,
    largeCardPadding,
    textAlign = 'left',
    headingLevel = 'h3',
  } = blok;

  const isVertical = orientation === 'vertical' || !orientation;
  const RichTextContent = hasRichText(content) ?
    <RichText
      wysiwyg={content}
      baseFontSize="ood-small"
      textColor={backgroundColor === 'white' ? 'black' : 'white'}
      linkColor={backgroundColor === 'white' ? 'default' : 'white'}
      textAlign={textAlign}
    /> : undefined;
  const CtaLink = !!getNumBloks(ctaLink) ? <CreateBloks blokSection={ctaLink} /> : null;

  return (
    <BasicCard
      {...storyblokEditable(blok)}
      superheadline={superheadline}
      headline={headline}
      body={RichTextContent}
      ctaLink={CtaLink}
      filename={showImage ? filename : ''}
      focus={showImage ? focus : ''}
      aspectRatio={showImage ? imageAspectRatio : undefined}
      visibleHorizontal={showImage ? visibleHorizontal : undefined}
      visibleVertical={showImage ? visibleVertical : undefined}
      isVertical={isVertical}
      bgColor={backgroundColor || 'white'}
      largeHeading={largeHeading}
      isSansHeading={isSansHeading}
      largeCardPadding={largeCardPadding}
      textAlign={textAlign}
      headingLevel={headingLevel || 'h3'}
    />
  );
};
