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

// TODO: This is a placeholder
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
    image: { filename, alt, focus} = {},
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

  const RichTextContent = hasRichText(content) ? <RichText wysiwyg={content} /> : undefined;
  const CtaLink = <CreateBloks blokSection={ctaLink} />;

  return (
    <BasicCard
      {...storyblokEditable(blok)}
      superheadline={superheadline}
      headline={headline}
      body={RichTextContent}
      ctaLink={CtaLink}
      filename={showImage ? filename : ''}
      alt={showImage ? alt : ''}
      focus={showImage ? focus : ''}
      aspectRatio={showImage ? imageAspectRatio : undefined}
      visibleHorizontal={showImage ? visibleHorizontal : undefined}
      visibleVertical={showImage ? visibleVertical : undefined}
      orientation={orientation}
      bgColor={backgroundColor}
      largeHeading={largeHeading}
      isSansHeading={isSansHeading}
      largeCardPadding={largeCardPadding}
      textAlign={textAlign}
      headingLevel={headingLevel || 'h3'}
    />
  );
};
