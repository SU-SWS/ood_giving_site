import { cnb } from 'cnbuilder';
import { Caption, type CaptionProps } from './Caption';
import { Container, type ContainerProps } from '@/components/Container';
import { storyImageWidths } from '@/components/Image';
import * as styles from './MediaWrapper.styles';

/**
 * This is a wrapper component for images and media elements.
 * that provides a shared set of layout and caption options.
 */
export type MediaWrapperProps = React.HTMLAttributes<HTMLDivElement> & CaptionProps & ContainerProps;

export const MediaWrapper = ({
  caption,
  captionAlign,
  isCard,
  captionBgColor,
  width, // This is the bounding width of the Container
  imageWidth, // This is the width of the wrapper inside the Container
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
      width={width}
      mt={mt}
      mb={mb}
      pt={pt}
      pb={pb}
      className={cnb(styles.root, className)}
      {...props}
    >
      <div className={cnb(styles.wrapper(imageWidth), storyImageWidths[imageWidth])}>
        <div className={imageWidth === 'su-w-full' ? 'h-[30vw]' : ''}>
          {children}
        </div>
        {caption && (
          <Caption
            imageWidth={imageWidth}
            caption={caption}
            isCard={isCard}
            captionBgColor={captionBgColor}
            captionAlign={captionAlign}
            isCaptionInset={imageWidth === 'su-w-full'}
          />
        )}
      </div>
    </Container>
  );
};
