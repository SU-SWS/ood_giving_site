import { cnb } from 'cnbuilder';
import { MediaWrapper, type MediaWrapperProps } from '@/components/Media';
import { type LightPageBgColorsType } from '@/utilities/datasource';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import * as styles from './Image.styles';

export type StoryImageProps = React.HTMLAttributes<HTMLDivElement> & MediaWrapperProps & {
  imageSrc: string;
  imageFocus?: string;
  alt?: string;
  visibleVertical?: styles.VisibleVerticalType;
  backgroundColor?: LightPageBgColorsType;
  isCard?: boolean;
};

export const StoryImage = ({
  imageSrc,
  imageFocus,
  imageWidth,
  alt,
  caption,
  isCard,
  backgroundColor,
  visibleVertical,
  pt,
  pb,
  ...props
}: StoryImageProps) => {
  const { width: originalWidth, height: originalHeight } = getSbImageSize(imageSrc);
  const cropSize = styles.imageCropsDesktop['free'];
  /**
   * Crop width and height are used for width and height attributes on the img element.
   * They don't need to be exact as long as the aspect ratio is correct.
   */
  const cropWidth = parseInt(cropSize?.split('x')[0], 10);
  // const cropHeight = !aspectRatio || !aspectRatio
  //   ? Math.round(originalHeight * 1000 / originalWidth)
  //   : parseInt(cropSize?.split('x')[1], 10);

  return (
    <MediaWrapper
      width={imageWidth !== 'su-w-full' && imageWidth !== 'fit-container' ? 'site' : 'full'}
      imageWidth={imageWidth || 'su-w-story'}
      caption={caption}
      pt={pt}
      pb={pb}
      {...props}
    >
      {!!imageSrc && (
        <picture>
          <source
            srcSet={getProcessedImage(imageSrc, cropSize, imageFocus)}
            media="(min-width: 1500px)"
          />
          {/* <source
            srcSet={getProcessedImage(imageSrc, styles.imageCropsSmallDesktop[aspectRatio], imageFocus)}
            media="(min-width: 992px)"
          />
          <source
            srcSet={getProcessedImage(imageSrc, styles.imageCropsTablet[aspectRatio], imageFocus)}
            media="(min-width: 576px)"
          />
          <source
            srcSet={getProcessedImage(imageSrc, styles.imageCropsMobile[aspectRatio], imageFocus)}
            media="(max-width: 575px)"
          /> */}
          <img
            src={getProcessedImage(imageSrc, cropSize, imageFocus)}
            loading="lazy"
            width={cropWidth}
            // height={cropHeight}
            alt={alt || ''}
            className={cnb(styles.image, styles.objectPositions('center', visibleVertical))}
          />
        </picture>
      )}
    </MediaWrapper>
  );
};
