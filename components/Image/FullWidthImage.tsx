import { getProcessedImage } from '@/utilities/getProcessedImage';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';

export type FullWidthImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  // blok: SbBlokData;
  // element?: string;
  classPrefix?: string;
  // className?: string;
  visibleVertical?: unknown;
  visibleHorizontal?: unknown;
};

export const FullWidthImage = ({
  filename,
  alt,
  focus,
  classPrefix,
  visibleHorizontal,
  visibleVertical,
  className,
  ...props
}: FullWidthImageProps) => {
  // const Element = element ?? 'figure' as ElementType<HTMLAttributes<HTMLElement>>;
  let largeImg,
    mediumImg,
    smallImg,
    originalImg = '';
  let imgSrcset,
    imgSizes,
    imgSrc = '';

  if (filename != null) {
    let imgWidth = 0;

    // Get image width from URL of storyblok image
    if (filename?.startsWith('http')) {
      imgWidth = parseInt(filename.split('/')[5].split('x')[0], 10) || 0;
    }

    originalImg = getProcessedImage(filename, '');

    if (imgWidth >= 800) {
      smallImg = getProcessedImage(filename, '800x0');
    }

    if (imgWidth >= 1200) {
      mediumImg = getProcessedImage(filename, '1200x0');
    }

    if (imgWidth >= 2000) {
      largeImg = getProcessedImage(filename, '2000x0');
    }

    imgSrcset = smallImg ? smallImg + ' 800w' : '';
    imgSrcset += mediumImg ? ',' + mediumImg + ' 1200w ' : '';
    imgSrcset += largeImg ? ',' + largeImg + ' 2000w ' : '';

    // Include the original image in the srcset if its width is > 800px and < 2000px
    if (imgWidth > 800 && imgWidth < 2000) {
      imgSrcset += originalImg ? ',' + originalImg + ' ' + imgWidth + 'w ' : '';
    }

    // Set sizes attribute only if imgSrcset is not empty (imgSrcset is empty if image width is < 800px)
    if (imgSrcset) {
      imgSizes = '100vw';
    }

    // If image is > 2000px, use the resized 2000px version for the src. Otherwise use original image.
    imgSrc = largeImg || originalImg;
  }

  return (
    <div>
      <div
        className={`su-media
              ${classPrefix ? `${classPrefix}__media` : ''}${
          className ? ` ${className}` : ''
        }`}
      >
        <img
          className={`${classPrefix ? `${classPrefix}__image` : ''}
              su-obj-position-h-${visibleHorizontal ?? 'center'}-v-${
            visibleVertical ?? 'top'
          }`}
          {...(imgSrcset ? { srcSet: imgSrcset } : {})}
          {...(imgSizes ? { sizes: imgSizes } : {})}
          src={imgSrc}
          alt={alt || ''}
        />
      </div>
    </div>
  );
};
