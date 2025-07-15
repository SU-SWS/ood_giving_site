import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import { SimpleCard } from '@/components/SimpleCard';
import { FlexBox } from '@/components/FlexBox';
import { Text, type TextAlignType } from '@/components/Typography';
import { type AllCardBgColorType } from '@/utilities/datasource';
import * as styles from './QuoteCard.styles';

type QuoteCardContentProps = {
  hasImage?: boolean;
  quoteText?: React.ReactNode;
  quoteSource?: React.ReactNode;
  quotationMarkColor?: styles.QuoteMarkColorType;
  isSmallText?: boolean;
  textAlign?: TextAlignType;
  smallText?: boolean;
};

const QuoteCardContent = ({
  hasImage,
  quoteText,
  quoteSource,
  quotationMarkColor,
  isSmallText,
  textAlign,
  smallText,
}: QuoteCardContentProps) => (
  <div>
    {quoteText && (
      <>
        <span aria-hidden="true" className={styles.quoteMark(quotationMarkColor)}>“</span>
        <Text
          as="blockquote"
          size={isSmallText ? 'f3' : 'f2'}
          align={textAlign}
          className={styles.quote(isSmallText)}
        >
          {quoteText}
        </Text>
      </>
    )}
    {quoteSource && (
      <Text className={styles.source}>
        {quoteSource}
      </Text>
    )}
  </div>
);

type QuoteCardProps = Omit<OverhangCardProps, 'variant'> & QuoteCardContentProps & {
  imageShape?: 'round' | 'square';
  borderColor?: AllCardBgColorType;
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
  smallText,
  ...props
}: QuoteCardProps) => {
  const hasImage = !!filename;

  return hasImage ? (
    <OverhangCard
      {...props}
      variant="quote"
      isVertical={false}
      bgColor={bgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize="thumbnail"
      aspectRatio="1x1"
      className="quote-card"
    >
      <FlexBox className={styles.blockquote(hasImage)} alignItems="center" justifyContent="center">
        <QuoteCardContent
          hasImage={hasImage}
          quoteText={quoteText}
          quoteSource={quoteSource}
          quotationMarkColor={quotationMarkColor}
          isSmallText={smallText}
          textAlign={textAlign}
        />
      </FlexBox>
    </OverhangCard>
  ) : (
    <SimpleCard
      {...props}
      hasLink={false}
      bgColor={bgColor}
      // className={styles.root(borderColor, hasImage)}
    >
      <FlexBox className={styles.blockquote(hasImage)} alignItems="center" justifyContent="center">
        <QuoteCardContent
          hasImage={hasImage}
          quoteText={quoteText}
          quoteSource={quoteSource}
          quotationMarkColor={quotationMarkColor}
          isSmallText={smallText}
          textAlign={textAlign}
        />
      </FlexBox>
    </SimpleCard>
  );
};
