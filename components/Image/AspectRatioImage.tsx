import React, { type ElementType, type HTMLAttributes } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';

export type AspectRatioImageProps = SbImageType & {
  blok: SbBlokData;
  element?: string;
  classPrefix?: string;
  otherClasses?: string;
  visibleVertical?: unknown;
  visibleHorizontal?: unknown;
  imageSize?: unknown;
  aspectRatio?: string;
};

export const AspectRatioImage = (props: AspectRatioImageProps) => {
  let processedImg = '';
  const Element = props.element ?? 'figure' as ElementType<HTMLAttributes<HTMLElement>>;

  if (props.filename != null) {
    let imgWidth = 0;

    if (props.filename?.startsWith('http')) {
      // Get image width from URL of storyblok image
      imgWidth = parseInt(props.filename.split('/')[5].split('x')[0], 10) || 0;
    }

    // Only scale image if original image size is larger than intended size
    if (props.imageSize === 'card' && imgWidth > 600) {
      processedImg = getProcessedImage(props.filename, '600x0');
    } else if (props.imageSize === 'thumbnail' && imgWidth > 400) {
      processedImg = getProcessedImage(props.filename, '400x0');
    } else if (
      (props.imageSize === 'header' ||
        props.imageSize === 'horizontal-card' ||
        props.imageSize === 'large-card') &&
      imgWidth > 800
    ) {
      processedImg = getProcessedImage(props.filename, '800x0');
    } else if (props.imageSize === 'gallery-slide') {
      processedImg = getProcessedImage(props.filename, '1400x0');
    } else if (imgWidth > 1000) {
      processedImg = getProcessedImage(props.filename, '1000x0');
    } else {
      processedImg = getProcessedImage(props.filename, '');
    }
  }

  return (
    <Element
      {...storyblokEditable(props.blok)}
      className={`su-media su-media--image ood-media ood-media--${
        props.aspectRatio
      }
            ${props.classPrefix ? `${props.classPrefix}__media` : ''}${
        props.otherClasses ? ` ${props.otherClasses}` : ''
      }`}
    >
      <div
        className={`su-media__wrapper su-aspect-ratio--${
          props.aspectRatio ?? '3x2'
        }`}
      >
        <img
          className={`ood-media__image
              ${props.classPrefix ? `${props.classPrefix}__image` : ''}
              su-obj-position-h-${props.visibleHorizontal ?? 'center'}-v-${
            props.visibleVertical ?? 'top'
          }`}
          src={processedImg}
          alt={props.alt ?? ''}
        />
      </div>
    </Element>
  );
};
