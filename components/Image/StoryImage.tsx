import { MediaWrapper, type MediaWrapperProps } from '@/components/Media';
import { type LightPageBgColorsType } from '@/utilities/datasource';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import * as styles from './Image.styles';

export type StoryImageProps = React.HTMLAttributes<HTMLDivElement> & MediaWrapperProps & {
  imageSrc: string;
  imageFocus?: string;
  isLoadingEager?: boolean;
  alt?: string;
  imageWidth?: styles.StoryImageWidthType;
  visibleVertical?: string;
  isCard?: boolean;
  backgroundColor?: LightPageBgColorsType;
};

export const StoryImage = ({
  imageSrc,
  imageFocus,
  imageWidth,
  isLoadingEager,
  alt,
  caption,
  isCard,
  backgroundColor,
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
      imageWidth={imageWidth}
      caption={caption}
      pt={pt}
      pb={pb}
      {...props}
      data-component="StoryImage"
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
            loading={isLoadingEager ? 'eager' : 'lazy'}
            fetchPriority={isLoadingEager ? 'high' : 'auto' }
            width={cropWidth}
            // height={cropHeight}
            alt={alt || ''}
            className={styles.image}
          />
        </picture>
      )}
    </MediaWrapper>
  );
};
