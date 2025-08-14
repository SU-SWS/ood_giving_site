'use client';

import {
  useCallback, useEffect, useMemo, useState, useRef, useId,
} from 'react';
import Slider from 'react-slick';
import { DialogTitle } from '@headlessui/react';
import { useOnClickOutside } from 'usehooks-ts';
import { Container, type ContainerProps } from '@/components/Container';
import { FlexBox } from '@/components/FlexBox';
import { HeroIcon } from '@/components/HeroIcon';
import { NextPrevButton } from '@/components/GallerySlideshow/NextPrevButton';
import { ThumbnailButton } from '@/components/GallerySlideshow/ThumbnailButton';
import { Slide } from '@/components/GallerySlideshow/Slide';
import { type SbGalleryImageType } from '@/components/Storyblok/Storyblok.types';
import { Modal } from '@/components/Modal';
import * as styles from './GallerySlideshow.styles';

type GallerySlideshowProps = ContainerProps & {
  slides: SbGalleryImageType[];
  ariaLabel?: string;
  showCounter?: boolean;
  showExpandLink?: boolean;
  containerWidth?: styles.ContainerWidthType;
}

export const GallerySlideshow = ({
  slides,
  ariaLabel = 'Image gallery',
  showCounter,
  showExpandLink,
  containerWidth,
  mt,
  mb,
  ...props
}: GallerySlideshowProps) => {
  const slideId = useId();
  const sliderRef = useRef<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [pagerOffset, setPagerOffset] = useState(0);
  const pagerWindowRef = useRef<HTMLDivElement | null>(null);
  const pagerRef = useRef<HTMLUListElement | null>(null);

  // Helper function to add a11y attributes to any slider
  const enhanceSliderA11y = useCallback((ref: React.RefObject<Slider>, slideTrackid: string, addIdToSlides = false) => {
    if (!ref.current) return;
    const trackEl = ref.current.innerSlider?.list?.querySelector('.slick-track');
    if (!trackEl) return;

    /**
     * Add aria-live='polite' so that when a slide becomes active (aria-hidden=true),
     * the slide's image alt and caption are announced by screen readers.
     */
    trackEl.setAttribute('aria-live', 'polite');

    // Add an id to the slider track so it can be referenced by the prev/next buttons
    (trackEl as HTMLElement).id = slideTrackid;

    const slideEls = trackEl.querySelectorAll('.slick-slide');
    slideEls.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      if (addIdToSlides) {
        /**
         * Add an id to each slide so the thumbnail button can reference it using aria-controls
         * Note: Slick uses cloned slides for infinite loop, so the slide with index=1 is actually the first slide.
         */
        slide.id = `${slideTrackid}-${index}`;
      }
    });
  }, []);

  // Main slider a11y
  useEffect(() => {
    enhanceSliderA11y(sliderRef, slideId, true);
  }, [slideId, enhanceSliderA11y]);

  // Modal states and refs
  const modalSlideId = useId();
  const modalSliderRef = useRef<Slider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    dotsClass: '@container',
    customPaging: (i: number) => (
      <ThumbnailButton
        slide={slides[i]}
        isActive={activeSlide === i}
        onFocus={() => adjustPagerPosition(i)}
        ariaLabel={`Slide ${i + 1}`}
        aria-disabled={activeSlide === i}
        aria-controls={`${slideId}-${i + 1}`}
      />
    ),
    beforeChange: (_oldIndex: number, newIndex: number) => {
      /**
       * Update React state immediately when slider is about to change
       * We need this to ensure the thumbnail navigation updates reliably when a longer caption in a slide causes a layout shift
       */
      setActiveSlide(newIndex);
    },
    afterChange: (i: number) => {
      setActiveSlide(i);
    },
    // The bottom half of the Slider which includes the prev/next buttons and thumbnail nav.
    appendDots: (dots: React.ReactNode) => (
      <div>
        <FlexBox justifyContent="center" className={styles.buttonWrapper}>
          <NextPrevButton
            direction="prev"
            onClick={clickPrev}
            slideId={slideId}
            className={styles.nextButton}
          />
          <NextPrevButton
            direction="next"
            onClick={clickNext}
            slideId={slideId}
            className={styles.prevButton}
          />
        </FlexBox>
        <button
          type="button"
          onClick={focusLastThumb}
          className={styles.skipButton}
        >
          {`Below is a navigation for ${slides?.length} total slides. Skip to the last item.`}
        </button>
        <nav aria-label={`${ariaLabel} thumbnails`} ref={pagerWindowRef} className={styles.pagerWindow}>
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
    slideId,
    activeSlide,
    adjustPagerPosition,
    ariaLabel,
    clickNext,
    clickPrev,
    focusLastThumb,
    pagerOffset,
    slides,
  ]);

  const modalSliderSettings = useMemo(() => ({
    accessibility: true,
    swipeToSlide: true,
    lazyLoad: 'ondemand' as const,
    nextArrow: (
      <NextPrevButton slideId={modalSlideId} direction="next" isLightText />
    ),
    prevArrow: (
      <NextPrevButton slideId={modalSlideId} direction="prev" isLightText />
    ),
    afterChange: (i: number) => {
      setActiveSlide(i);
    },
    initialSlide: activeSlide,
  }), [activeSlide, modalSlideId]);

  return (
    <>
      {/* Carousel not in modal */}
      <Container
        as="section"
        aria-roledescription="carousel"
        width={containerWidth === 'constrain-max-width' ? 'site' : 'full'}
        mt={mt}
        mb={mb}
        aria-label={ariaLabel}
        className={styles.root}
        {...props}
      >
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
        <Slider
          className={styles.slider(containerWidth)}
          aria-live="polite"
          ref={sliderRef}
          {...sliderSettings}
        >
          {slides?.map((slide, index) => (
            <Slide
              key={slide._uid}
              imageSrc={slide.image?.filename}
              caption={slide.caption}
              num={showCounter ? index + 1 : undefined}
              numSlides={showCounter ? slides.length : undefined}
              alt={slide.image?.alt || ''}
            />
          ))}
        </Slider>
        {/* Content from appendDots appears here */}
      </Container>
      {/* Modal with carousel; use the afterEnter prop to run the updateModalSliderA11y helper after modal is fully mounted */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        afterEnter={() => {
          enhanceSliderA11y(modalSliderRef, modalSlideId);
        }}
        className={styles.dialog}
      >
        <DialogTitle className={styles.srOnly}>{`${ariaLabel} full screen view`}</DialogTitle>
        <div ref={modalContentRef} className={styles.modalContentWrapper}>
          <section aria-roledescription="carousel" aria-label={ariaLabel}>
            <div className={styles.modalSliderWrapper}>
              <Slider
                className={styles.modalSlider}
                ref={modalSliderRef}
                {...modalSliderSettings}
              >
                {slides?.map((slide, index) => (
                  <Slide
                    key={slide._uid}
                    imageSrc={slide.image?.filename}
                    caption={slide.caption}
                    alt={slide.image?.alt || ''}
                    num={showCounter ? index + 1 : undefined}
                    numSlides={showCounter ? slides.length : undefined}
                    isModalSlide
                  />
                ))}
              </Slider>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
};
