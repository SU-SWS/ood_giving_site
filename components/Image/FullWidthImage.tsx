import { useMemo } from 'react';
import { cnb } from 'cnbuilder';
import { getImageSources } from '@/utilities/getImageSources';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Image.styles';

export type FullWidthImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  visibleVertical?: styles.VisibleVerticalType;
  visibleHorizontal?: styles.VisibleHorizontalType;
  fetchPriority?: 'low' | 'high' | 'auto';
  loading?: 'eager' | 'lazy';
};

export const FullWidthImage = ({
  filename,
  alt,
  visibleHorizontal,
  visibleVertical,
  fetchPriority,
  loading = fetchPriority === 'high' ? 'eager' : 'lazy',
  className,
}: FullWidthImageProps) => {
 // Get corresponding image sources for responsive images
  const imageSources = useMemo(() => {
    return getImageSources(filename);
  }, [filename]);

  return (
    <div className={className}>
      <picture>
        {imageSources.map(({ srcSet, media }) => (
          <source
            key={srcSet}
            srcSet={srcSet}
            media={media}
          />
        ))}
        <img
          src={imageSources[0].srcSet} // Use the first source as the default image
          alt={alt || ''}
          width={imageSources[0].width}
          height={imageSources[0].height}
          fetchPriority={fetchPriority}
          loading={loading}
          className={cnb(
            'size-full object-cover',
            styles.objectPositions(visibleHorizontal, visibleVertical),
          )}
        />
      </picture>
    </div>
  );
};
