'use client';

import {
  useCallback, useEffect, useMemo, useState, useRef,
} from 'react';
import {
  Dialog, DialogPanel, DialogTitle, Transition, TransitionChild,
} from '@headlessui/react';
import Slider from 'react-slick';
import { useOnClickOutside } from 'usehooks-ts';
import { Container, type ContainerProps } from '@/components/Container';
import { FlexBox } from '@/components/FlexBox';
import { HeroIcon } from '@/components/HeroIcon';
import { NextPrevButton } from '@/components/GallerySlideshow/NextPrevButton';
import { ThumbnailButton } from '@/components/GallerySlideshow/ThumbnailButton';
import { Slide } from '@/components/GallerySlideshow/Slide';
import { RichText } from '@/components/RichText';
import { SrOnlyText, Text } from '@/components/Typography';
import { type SbGalleryImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './GallerySlideshow.styles';

type GallerySlideshowProps = ContainerProps & {
  slides: SbGalleryImageType[];
  ariaLabel?: string;
  showCounter?: boolean;
  showExpandLink?: boolean;
}

export const GallerySlideshow = ({
  slides,
  ariaLabel,
  showCounter,
  showExpandLink,
  mt,
  mb,
  ...props
}: GallerySlideshowProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [pagerOffset, setPagerOffset] = useState(0);
  const pagerWindowRef = useRef<HTMLDivElement | null>(null);
  const pagerRef = useRef<HTMLUListElement | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  // Modal states and refs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalSliderRef = useRef<Slider | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalContentRef, () => {
    setIsModalOpen(false);
  });

  const clickPrev = useCallback(() => sliderRef.current?.slickPrev(), []);
  const clickNext = useCallback(() => sliderRef.current?.slickNext(), []);

  const focusLastThumb = useCallback(() => {
    const lastThumb = pagerRef.current?.lastElementChild as HTMLElement;
    const button = lastThumb?.querySelector('button') as HTMLButtonElement;
    button?.focus();
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    sliderRef.current?.slickGoTo(activeSlide, true);
  }, [activeSlide]);

  // This moves the thumbnail into view when the active slide changes.
  const adjustPagerPosition = useCallback(
    (targetIndex?: number) => {
      if (!pagerRef.current || !pagerWindowRef.current) return;

      const index = targetIndex ?? activeSlide;
      const targetItem = pagerRef.current.children[index];
      if (!targetItem) return;

      const windowBox = pagerWindowRef.current.getBoundingClientRect();
      const pagerBox = pagerRef.current.getBoundingClientRect();
      const targetItemBox = targetItem.getBoundingClientRect();

      const rightGutter = 10;
      const currentOffset = pagerBox.left - windowBox.left;

      if (targetItemBox.right > windowBox.right) {
        setPagerOffset(currentOffset + (windowBox.right - targetItemBox.right) - rightGutter);
      } else if (targetItemBox.left < windowBox.left) {
        setPagerOffset(currentOffset + (windowBox.left - targetItemBox.left));
      }
    }, [activeSlide],
  );

  useEffect(() => {
    adjustPagerPosition();
  }, [activeSlide, adjustPagerPosition]);

  const sliderSettings = useMemo(() => ({
    arrows: false,
    accessibility: true,
    swipeToSlide: true,
    lazyLoad: 'ondemand' as const,
    dots: true,
    dotsClass: 'relative @container',
    customPaging: (i: number) => (
      <ThumbnailButton
        slide={slides[i]}
        isActive={activeSlide === i}
        onFocus={() => adjustPagerPosition(i)}
        ariaLabel={`Go to slide ${i + 1} ${slides[i]?.alt || ''}`}
      />
    ),
    afterChange: (i: number) => {
      setActiveSlide(i);
    },
    // The bottom half of the Slider which includes the counter, expand button, caption and thumbnail nav.
    appendDots: (dots: React.ReactNode) => (
      <div>
        <FlexBox justifyContent="center" className={styles.buttonWrapper}>
          <NextPrevButton
            direction="prev"
            onClick={clickPrev}
            className={styles.nextButton}
          />
          <NextPrevButton
            direction="next"
            onClick={clickNext}
            className={styles.prevButton}
          />
        </FlexBox>
        <FlexBox justifyContent="center" className={styles.counterExpandWrapper}>
          <Text as="span" aria-hidden="true" leading="none" align="center">
            {`${activeSlide + 1}/${slides?.length}`}
          </Text>
          <SrOnlyText>{`Slide ${activeSlide + 1} of ${slides?.length}`}</SrOnlyText>
          {showExpandLink && (
            <button
              type="button"
              onClick={openModal}
              aria-haspopup="dialog"
              className={styles.expandButton}
              aria-label="Expand gallery in full screen modal"
            >
              Expand
              <HeroIcon icon="expand" className={styles.expandIcon} />
            </button>
          )}
        </FlexBox>
        <RichText
          textColor="black-70"
          // linkColor={isLightText ? 'digital-red-xlight' : 'unset'}
          wysiwyg={slides[activeSlide]?.caption}
          className={styles.caption}
        />
        <button
          type="button"
          onClick={focusLastThumb}
          className={styles.skipButton}
        >
          {`Below is a navigation for ${slides?.length} total slides. Skip to the last item.`}
        </button>
        <nav aria-label={`${ariaLabel || 'Photo gallery'} thumbnail`} ref={pagerWindowRef} className={styles.pagerWindow}>
          <FlexBox
            as="ul"
            alignItems="end"
            className={styles.pagerList}
            ref={pagerRef}
            style={{ transform: `translateX(${pagerOffset}px)` }}
          >
            {dots}
          </FlexBox>
        </nav>
      </div>
    ),
  }), [
    activeSlide,
    adjustPagerPosition,
    ariaLabel,
    clickNext,
    clickPrev,
    focusLastThumb,
    openModal,
    pagerOffset,
    showExpandLink,
    slides,
  ]);

  const modalSliderSettings = useMemo(() => ({
    accessibility: true,
    swipeToSlide: true,
    lazyLoad: 'ondemand' as const,
    nextArrow: (
      <NextPrevButton direction="next" isLightText />
    ),
    prevArrow: (
      <NextPrevButton direction="prev" isLightText />
    ),
    afterChange: (i: number) => setActiveSlide(i),
    initialSlide: activeSlide,
  }), [activeSlide]);

  return (
    <>
      <Container as="section" width="full" mt={mt} mb={mb} aria-label={ariaLabel} className={styles.root} {...props}>
        <Slider
          className={styles.slider}
          ref={sliderRef}
          {...sliderSettings}
        >
          {slides?.map((slide) => (
            <Slide
              key={slide._uid}
              imageSrc={slide.image?.filename}
              alt={slide.alt}
            />
          ))}
        </Slider>
        {/* Content from appendDots appears here */}
      </Container>
      <Transition show={isModalOpen}>
        <Dialog onClose={closeModal} className={styles.dialog}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.dialogOverlay} />
          </TransitionChild>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className={styles.dialogWrapper}>
              <DialogPanel className={styles.dialogPanel}>
                <DialogTitle className={styles.srOnly}>{`${ariaLabel || 'Photo gallery' } full screen view`}</DialogTitle>
                <div ref={modalContentRef} className={styles.contentWrapper}>
                  <button
                    type="button"
                    aria-label="Close modal"
                    onClick={closeModal}
                    className={styles.modalClose}
                  >
                    <HeroIcon
                      noBaseStyle
                      focusable="false"
                      strokeWidth={2}
                      icon="close"
                      className={styles.modalIcon}
                    />
                  </button>
                  <section aria-label={`${ariaLabel || 'Photo gallery'}`}>
                    <div className={styles.modalSliderWrapper}>
                      <Slider
                        className={styles.modalSlider}
                        ref={modalSliderRef}
                        {...modalSliderSettings}
                      >
                        {slides?.map((slide) => (
                          <Slide
                            key={slide._uid}
                            imageSrc={slide.image?.filename}
                            alt={slide.alt}
                          />
                        ))}
                      </Slider>
                    </div>
                    <div className={styles.belowModalSlider}>
                      <Text as="span" leading="none" align="center" aria-hidden="true" className={styles.modalCounter}>
                        {`${activeSlide + 1}/${slides?.length}`}
                      </Text>
                      <SrOnlyText>{`Slide ${activeSlide + 1} of ${slides?.length}`}</SrOnlyText>
                      <RichText
                        textColor="white"
                        // linkColor="digital-red-xlight"
                        wysiwyg={slides[activeSlide]?.caption}
                        className={styles.modalCaption}
                      />
                    </div>
                  </section>
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};
