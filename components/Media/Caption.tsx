import { cnb } from 'cnbuilder';
import { Container } from '@/components/Container';
import { type StoryImageWidthType } from '@/components/Image';
import { lightPageBgColors, type LightPageBgColorsType } from '@/utilities/datasource';
import { type TextAlignType } from '@/components/Typography';
import * as styles from './MediaWrapper.styles';

/**
 * This is a caption component for images, looping video and embedded video
 * that provides a shared set of layout and options.
 */

export type CaptionProps = React.HTMLAttributes<HTMLDivElement> & {
  imageWidth?: StoryImageWidthType;
  caption?: React.ReactNode;
  captionAlign?: TextAlignType;
  isCard?: boolean;
  // Inset the caption to centered container width when the media is edge-to-edge
  isCaptionInset?: boolean;
  captionBgColor?: LightPageBgColorsType;
};

export const Caption = ({
  imageWidth,
  caption,
  captionAlign,
  isCaptionInset,
  isCard,
  captionBgColor = 'white',
  className,
  ...props
}: CaptionProps) => {
  if (!caption) return null;

  return (
    <Container
      as="figcaption"
      width={isCaptionInset ? 'site' : 'full'}
      className={cnb(styles.captionWrapper, lightPageBgColors[captionBgColor])}
      {...props}
    >
      <div className={styles.caption(isCard, imageWidth, captionBgColor, captionAlign)}>
        {caption}
      </div>
    </Container>
  );
};
