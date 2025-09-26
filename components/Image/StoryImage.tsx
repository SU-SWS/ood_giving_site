import { cnb } from 'cnbuilder';
import { AspectRatioImage } from './AspectRatioImage';
import { FullWidthImage } from './FullWidthImage';
import { MediaWrapper, type MediaWrapperProps } from '@/components/Media';
import { type LightPageBgColorType } from '@/utilities/datasource';
import * as styles from './Image.styles';

export type StoryImageProps = MediaWrapperProps & {
  imageSrc: string;
  imageFocus?: string;
  alt?: string;
  aspectRatio?: styles.ImageAspectRatioType;
  visibleVertical?: styles.VisibleVerticalType;
  backgroundColor?: LightPageBgColorType;
  isCard?: boolean;
};

export const StoryImage = ({
  imageSrc,
  imageFocus,
  mediaWidth,
  aspectRatio = 'free',
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
  const hasAspectRatio = !!aspectRatio && aspectRatio !== 'free';

  return (
    <MediaWrapper
      width={mediaWidth !== 'su-w-full' && mediaWidth !== 'fit-container' ? 'site' : 'full'}
      mediaWidth={mediaWidth || 'su-w-story'}
      caption={caption}
      captionAlign={captionAlign}
      captionBgColor={backgroundColor}
      isCard={isCard}
      pt={pt}
      pb={pb}
      {...props}
    >
      {!!imageSrc && (
        <>
          {hasAspectRatio ? (
            <AspectRatioImage
              filename={imageSrc}
              focus={imageFocus}
              visibleVertical={visibleVertical}
              alt={alt}
              aspectRatio={aspectRatio}
              className={cnb(styles.image, styles.objectPositions('center', visibleVertical))}
            />
          ) : (
            <FullWidthImage
              filename={imageSrc}
              alt={alt}
              visibleVertical={visibleVertical}
              className={cnb(styles.image, styles.objectPositions('center', visibleVertical))}
            />
          )}
        </>
      )}
    </MediaWrapper>
  );
};
