import { cnb } from 'cnbuilder';
import { Caption, type CaptionProps } from './Caption';
import { Container } from '@/components/Container';
import { type LargeMarginType, type PaddingType } from '@/utilities/datasource';
import { imageAspectRatios, type ImageAspectRatioType } from '@/utilities/datasource';
import * as styles from './MediaWrapper.styles';

/**
 * This is a wrapper component for images and media elements.
 * that provides a shared set of layout and caption options.
 */
export type MediaWrapperProps = React.HTMLAttributes<HTMLDivElement> & CaptionProps & {
  aspectRatio?: ImageAspectRatioType;
  isInset?: boolean; // Inset image to make it smaller
  mt?: LargeMarginType;
  mb?: LargeMarginType;
  pt?: PaddingType;
  pb?: PaddingType;
};

export const MediaWrapper = ({
  caption,
  aspectRatio,
  isInset,
  mt,
  mb,
  pt,
  pb,
  children,
  className,
  ...props
}: MediaWrapperProps) => {
  return (
    <Container
      as="figure"
      width="full"
      mt={mt}
      mb={mb}
      pt={pt}
      pb={pb}
      className={cnb(styles.root(isInset), className)}
      {...props}
      data-component="MediaWrapper"
    >
      <div data-component="ImageWrapper" className={imageAspectRatios[aspectRatio]}>
        {children}
      </div>
      {caption && (
        <Caption caption={caption} />
      )}
    </Container>
  );
};
