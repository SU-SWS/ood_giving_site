import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { QuoteCard, type QuoteMarkColorType } from '@/components/QuoteCard';
import { RichText } from '@/components/RichText';
import { SbImageType } from './Storyblok.types';
import { type TextAlignType } from '@/components/Typography';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { hasRichText } from '@/utilities/hasRichText';
import { type AllCardBgColorType, type LightPageBgColorType } from '@/utilities/datasource';

export type SbQuoteCardProps = {
  blok: SbBlokData & {
    quoteText?: StoryblokRichtext;
    quoteSource?: StoryblokRichtext;
    image?: SbImageType;
    showImage?: 'has-image' | 'no-image';
    visibleHorizontal?: VisibleHorizontalType;
    visibleVertical?: VisibleVerticalType;
    imageShape?: 'round' | 'square';
    borderColor?: AllCardBgColorType;
    backgroundColor?: LightPageBgColorType;
    quotationMarkColor?: QuoteMarkColorType;
    smallText?: boolean;
    textAlign?: TextAlignType;
  };
};

export const SbQuoteCard = ({ blok }: SbQuoteCardProps) => {
  const {
    quoteText,
    quoteSource,
    image: { filename, alt, focus} = {},
    showImage,
    visibleHorizontal = 'center',
    visibleVertical = 'top',
    imageShape = 'square',
    borderColor,
    backgroundColor = 'white',
    quotationMarkColor = 'palo-verde-light',
    smallText,
    textAlign,
  } = blok;

  const displayImage = showImage === 'has-image';
  const hasQuoteText = hasRichText(quoteText);
  const hasQuoteSource = hasRichText(quoteSource);

  if (!hasQuoteText && !hasQuoteSource) {
    return null;
  }

  const QuoteText = hasQuoteText ? (
    <RichText
      wysiwyg={quoteText}
      textAlign={textAlign}
    />
  ) : null;

  const QuoteSource = hasQuoteSource ? (
    <RichText
      wysiwyg={quoteSource}
      textAlign={textAlign}
    />
  ) : null;

  return (
    <QuoteCard
      {...storyblokEditable(blok)}
      quoteText={QuoteText}
      quoteSource={QuoteSource}
      filename={displayImage ? filename : ''}
      alt={displayImage ? alt : ''}
      focus={displayImage ? focus : ''}
      visibleHorizontal={displayImage ? visibleHorizontal : undefined}
      visibleVertical={displayImage ? visibleVertical : undefined}
      imageShape={imageShape || 'square'}
      borderColor={borderColor}
      bgColor={backgroundColor || 'white'}
      quotationMarkColor={quotationMarkColor || 'palo-verde-light'}
      isSmallText={smallText}
      textAlign={textAlign}
    />
  );
};
