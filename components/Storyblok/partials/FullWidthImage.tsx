import React, { type ElementType, type HTMLAttributes } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';

export type FullWidthImageProps = SbImageType & {
  blok: SbBlokData;
  element?: string;
  classPrefix?: string;
  otherClasses?: string;
  visibleVertical?: unknown;
  visibleHorizontal?: unknown;
};

export const FullWidthImage = (props: FullWidthImageProps) => {
  const Element = props.element ?? 'figure' as ElementType<HTMLAttributes<HTMLElement>>;
  let largeImg,
    mediumImg,
    smallImg,
    originalImg = '';
  let imgSrcset,
    imgSizes,
    imgSrc = '';

  if (props.filename != null) {
    let imgWidth = 0;

    // Get image width from URL of storyblok image
    if (props.filename?.startsWith('http')) {
      imgWidth = parseInt(props.filename.split('/')[5].split('x')[0], 10) || 0;
    }

    originalImg = getProcessedImage(props.filename, '');

    if (imgWidth >= 800) {
      smallImg = getProcessedImage(props.filename, '/800x0');
    }

    if (imgWidth >= 1200) {
      mediumImg = getProcessedImage(props.filename, '/1200x0');
    }

    if (imgWidth >= 2000) {
      largeImg = getProcessedImage(props.filename, '/2000x0');
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
    <div {...storyblokEditable(props.blok)}>
      <Element
        className={`su-media
              ${props.classPrefix ? `${props.classPrefix}__media` : ''}${
          props.otherClasses ? ` ${props.otherClasses}` : ''
        }`}
      >
        <img
          className={`${props.classPrefix ? `${props.classPrefix}__image` : ''}
              su-obj-position-h-${props.visibleHorizontal ?? 'center'}-v-${
            props.visibleVertical ?? 'top'
          }`}
          {...(imgSrcset ? { srcSet: imgSrcset } : {})}
          {...(imgSizes ? { sizes: imgSizes } : {})}
          src={imgSrc}
          alt={props.alt ?? ''}
        />
      </Element>
    </div>
  );
};
