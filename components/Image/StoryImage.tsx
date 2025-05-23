import { cnb } from 'cnbuilder';
import { useMemo } from 'react';
import { MediaWrapper, type MediaWrapperProps } from '@/components/Media';
import { type LightPageBgColorsType } from '@/utilities/datasource';
import { getImageSources } from '@/utilities/getImageSources';
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

  // Get corresponding image sources for responsive images
  const imageSources = useMemo(() => {
    return getImageSources(imageSrc, originalWidth, originalHeight);
  }, [originalWidth, imageSrc, originalHeight]);

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
          {imageSources.map(({ width, srcSet, media }) => (
            <source
              key={`source-${width}`}
              srcSet={srcSet}
              media={media}
            />
          ))}
          <img
            src={imageSources[0].srcSet}
            loading="lazy"
            width={originalWidth}
            height={originalHeight}
            alt={alt || ''}
            className={cnb(styles.image, styles.objectPositions('center', visibleVertical))}
          />
        </picture>
      )}
    </MediaWrapper>
  );
};
