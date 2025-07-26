import { cnb } from 'cnbuilder';
import { Container } from '@/components/Container';
import { type MediaWidthType } from './MediaWrapper.styles';
import { lightPageBgColors, type LightPageBgColorType } from '@/utilities/datasource';
import { type TextAlignType } from '@/components/Typography';
import * as styles from './MediaWrapper.styles';

/**
 * This is a caption component for images, looping video and embedded video
 * that provides a shared set of layout and options.
 */

export type CaptionProps = React.HTMLAttributes<HTMLDivElement> & {
  mediaWidth?: MediaWidthType;
  caption?: React.ReactNode;
  captionAlign?: TextAlignType;
  isCard?: boolean;
  // Inset the caption to centered container width when the media is edge-to-edge
  isCaptionInset?: boolean;
  captionBgColor?: LightPageBgColorType;
};

export const Caption = ({
  mediaWidth,
  caption,
  captionAlign,
  isCaptionInset,
  isCard,
  captionBgColor,
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
      <div className={styles.caption(isCard, mediaWidth, captionBgColor, captionAlign)}>
        {caption}
      </div>
    </Container>
  );
};
