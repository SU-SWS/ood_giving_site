import { cnb } from 'cnbuilder';
import { MediaWrapper, type MediaWrapperProps } from '@/components/Media';
import { type LightPageBgColorsType } from '@/utilities/datasource';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import * as styles from './Image.styles';

export type StoryImageProps = React.HTMLAttributes<HTMLDivElement> & MediaWrapperProps & {
  imageSrc: string;
  alt?: string;
  visibleVertical?: styles.VisibleVerticalType;
  backgroundColor?: LightPageBgColorsType;
  isCard?: boolean;
};

export const StoryImage = ({
  imageSrc,
  imageWidth,
  alt,
  caption,
  captionAlign,
  isCard,
  backgroundColor,
  visibleVertical,
  pt,
  pb,
  ...props
}: StoryImageProps) => {
  const { width: originalWidth, height: originalHeight } = getSbImageSize(imageSrc);
  const cropSize = styles.imageCropsDesktop['free'];

  return (
    <MediaWrapper
      width={imageWidth !== 'su-w-full' && imageWidth !== 'fit-container' ? 'site' : 'full'}
      imageWidth={imageWidth || 'su-w-story'}
      caption={caption}
      captionAlign={captionAlign}
      captionBgColor={backgroundColor}
      isCard={isCard}
      pt={pt}
      pb={pb}
      {...props}
    >
      {!!imageSrc && (
        <picture>
          <source
            srcSet={getProcessedImage(imageSrc, cropSize)}
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
            src={getProcessedImage(imageSrc, cropSize)}
            loading="lazy"
            // width={cropWidth}
            // height={cropHeight}
            alt={alt || ''}
            className={cnb(styles.image, styles.objectPositions('center', visibleVertical))}
          />
        </picture>
      )}
    </MediaWrapper>
  );
};
