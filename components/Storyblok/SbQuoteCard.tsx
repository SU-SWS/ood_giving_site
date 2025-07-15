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
    showImage?: boolean;
    visibleHorizontal?: VisibleHorizontalType;
    visibleVertical?: VisibleVerticalType;
    imageShape?: 'round' | 'square';
    borderColor?: AllCardBgColorType;
    backgroundColor?: LightPageBgColorType;
    quotationMarkColor?: QuoteMarkColorType;
    isSmallText?: boolean;
    textAlign?: TextAlignType;
  };
};

export const SbQuoteCard = ({
  blok,
}: SbQuoteCardProps) => {
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
    isSmallText,
    textAlign,
  } = blok;

  const hasQuoteText = hasRichText(quoteText);
  const hasQuoteSource = hasRichText(quoteSource);

  if (!hasQuoteText && !hasQuoteSource) {
    return null;
  }

  const QuoteText = hasQuoteText ? (
    <RichText
      wysiwyg={quoteText}
      textAlign={textAlign}
      className={isSmallText ? 'rs-text-sm' : ''}
    />
  ) : null;

  const QuoteSource = hasQuoteSource ? (
    <RichText
      wysiwyg={quoteSource}
      textAlign={textAlign}
      className={isSmallText ? 'rs-text-sm' : ''}
    />
  ) : null;

  return (
    <QuoteCard
      {...storyblokEditable(blok)}
      quoteText={QuoteText}
      quoteSource={QuoteSource}
      filename={showImage ? filename : ''}
      alt={showImage ? alt : ''}
      focus={showImage ? focus : ''}
      visibleHorizontal={showImage ? visibleHorizontal : undefined}
      visibleVertical={showImage ? visibleVertical : undefined}
      imageShape={imageShape || 'square'}
      borderColor={borderColor}
      bgColor={backgroundColor || 'white'}
      quotationMarkColor={quotationMarkColor || 'palo-verde-light'}
      isSmallText={isSmallText}
      textAlign={textAlign}
    />
  );
};
