import { useMemo } from 'react';
import { cnb } from 'cnbuilder';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { getImageSources } from '@/utilities/getImageSources';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Image.styles';

export type FullWidthImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  classPrefix?: string;
  visibleVertical?: styles.VisibleVerticalType;
  visibleHorizontal?: styles.VisibleHorizontalType;
};

export const FullWidthImage = ({
  filename,
  alt,
  classPrefix,
  visibleHorizontal,
  visibleVertical,
  className,
}: FullWidthImageProps) => {
  const { width: originalWidth, height: originalHeight } = getSbImageSize(filename);

 // Get corresponding image sources for responsive images
  const imageSources = useMemo(() => {
    return getImageSources(filename, originalWidth);
  }, [originalWidth, filename]);

  return (
    <div className={cnb('su-media', classPrefix && `${classPrefix}__media`, className)}>
      <picture>
        {imageSources.map(({ srcSet, media }, index) => (
          <source
            key={`source-${index}`}
            srcSet={srcSet}
            media={media}
          />
        ))}
        <img
          src={imageSources[0].srcSet} // Use the first source as the default image
          alt={alt || ''}
          width={originalWidth}
          height={originalHeight}
          className={cnb(
            'size-full object-cover',
            styles.objectPositions(visibleHorizontal, visibleVertical),
            classPrefix && `${classPrefix}__image`)
          }
        />
      </picture>
    </div>
  );
};
