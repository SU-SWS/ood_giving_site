'use client';
import { cnb } from 'cnbuilder';
import { useWindowSize } from 'usehooks-ts';
import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import { SimpleCard } from '@/components/SimpleCard';
import { FlexBox } from '@/components/FlexBox';
import { Text, type TextAlignType } from '@/components/Typography';
import { type BorderColorType } from '@/utilities/datasource';
import { config } from '@/utilities/config';
import * as styles from './QuoteCard.styles';

type QuoteCardContentProps = {
  hasImage?: boolean;
  quoteText?: React.ReactNode;
  quoteSource?: React.ReactNode;
  quotationMarkColor?: styles.QuoteMarkColorType;
  textAlign?: TextAlignType;
  isSmallText?: boolean;
};

const QuoteCardContent = ({
  hasImage,
  quoteText,
  quoteSource,
  quotationMarkColor,
  isSmallText,
  textAlign,
}: QuoteCardContentProps) => (
  <FlexBox direction="col" className={styles.content(textAlign)}>
    {quoteText && (
      <>
        <span aria-hidden="true" className={styles.quoteMark(quotationMarkColor, isSmallText)}>“</span>
        <Text
          as="blockquote"
          font="serif"
          align={textAlign}
          className={styles.quote(isSmallText)}
        >
          {quoteText}
        </Text>
      </>
    )}
    {quoteSource && (
      <Text size={1} weight="semibold" className={styles.source}>
        {quoteSource}
      </Text>
    )}
  </FlexBox>
);

type QuoteCardProps = Omit<OverhangCardProps, 'variant'> & QuoteCardContentProps & {
  imageShape?: styles.ImageShapeType;
  borderColor?: BorderColorType;
};

export const QuoteCard = ({
  quoteText,
  quoteSource,
  filename,
  focus,
  alt,
  visibleHorizontal = 'center',
  visibleVertical = 'top',
  borderColor,
  imageShape = 'square',
  bgColor = 'white',
  quotationMarkColor = 'palo-verde-light',
  textAlign,
  isSmallText,
  ...props
}: QuoteCardProps) => {
  const hasImage = !!filename;
  const windowSize = useWindowSize();
  const useVerticalStyle = windowSize?.width < config.breakpoints.lg;

  return hasImage ? (
    <OverhangCard
      {...props}
      variant="quote"
      isVertical={useVerticalStyle}
      bgColor={bgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize="thumbnail"
      aspectRatio="1x1"
      imageWrapperClassName={styles.imageWrapper(imageShape, useVerticalStyle)}
      className={cnb('quote-card', styles.rootHasImage(borderColor))}
    >
      <div className={styles.contentHasImage(bgColor)}>
        <QuoteCardContent
          hasImage={hasImage}
          quoteText={quoteText}
          quoteSource={quoteSource}
          quotationMarkColor={quotationMarkColor}
          isSmallText={isSmallText}
          textAlign={textAlign}
        />
      </div>
    </OverhangCard>
  ) : (
    <SimpleCard
      {...props}
      hasLink={false}
      bgColor={bgColor}
      className={styles.rootNoImage(borderColor)}
    >
      <div className={styles.contentNoImage(bgColor)}>
        <QuoteCardContent
          hasImage={hasImage}
          quoteText={quoteText}
          quoteSource={quoteSource}
          quotationMarkColor={quotationMarkColor}
          isSmallText={isSmallText}
          textAlign={textAlign}
        />
      </div>
    </SimpleCard>
  );
};
