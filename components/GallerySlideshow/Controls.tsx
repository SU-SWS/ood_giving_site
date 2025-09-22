'use client';

import { cnb } from 'cnbuilder';
import { NextPrevButton } from '@/components/GallerySlideshow/NextPrevButton';
import * as styles from './GallerySlideshow.styles';

type ControlsProps = {
  onPrev: VoidFunction;
  onNext: VoidFunction;
  slideId?: string;
  isModal?: boolean;
  showExpandLink?: boolean;
  className?: string;
};

export const Controls = ({
  onPrev,
  onNext,
  slideId,
  isModal = false,
  showExpandLink,
  className,
}: ControlsProps) => {
  const wrapperClass = isModal ? styles.modalControlsWrapper : styles.controlsWrapper;

  return (
    <div className={cnb(wrapperClass, className)}>
      <NextPrevButton
        direction="prev"
        onClick={onPrev}
        slideId={slideId}
        isLightText={isModal}
        className={cnb(styles.controlsBase(showExpandLink), styles.controlLeft)}
      />
      <NextPrevButton
        direction="next"
        onClick={onNext}
        slideId={slideId}
        isLightText={isModal}
        className={cnb(styles.controlsBase(showExpandLink), styles.controlRight)}
      />
    </div>
  );
};
