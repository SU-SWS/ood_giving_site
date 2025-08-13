'use client';

import {
  useCallback, useEffect, useMemo, useState, useRef, useId,
} from 'react';
import {
  Dialog, DialogPanel, DialogTitle, DialogBackdrop, Transition, TransitionChild,
} from '@headlessui/react';
import Slider from 'react-slick';
import { useOnClickOutside } from 'usehooks-ts';
import { Container, type ContainerProps } from '@/components/Container';
import { FlexBox } from '@/components/FlexBox';
import { HeroIcon } from '@/components/HeroIcon';
import { Text } from '@/components/Typography';
import { NextPrevButton } from '@/components/GallerySlideshow/NextPrevButton';
import { ThumbnailButton } from '@/components/GallerySlideshow/ThumbnailButton';
import { Slide } from '@/components/GallerySlideshow/Slide';
import { type SbGalleryImageType } from '@/components/Storyblok/Storyblok.types';
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

  // Add a11y enhancement to the Slick slider code
  useEffect(() => {
    if (!sliderRef.current) return;
    const trackEl = sliderRef.current.innerSlider?.list?.querySelector('.slick-track');
    if (!trackEl) return;

    /**
     * Add aria-live='polite' so that when a slide becomes active (aria-hidden=true),
     * the slide's image alt and caption are announced by screen readers.
     */
    trackEl.setAttribute('aria-live', 'polite');

    // Add an id to the slider track so it can be referenced by the prev/next buttons
    (trackEl as HTMLElement).id = slideId;

    const slidesEls = trackEl.querySelectorAll('.slick-slide');
    slidesEls.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');

      /**
       * Add an id to each slide so the thumbnail button can reference it using aria-controls
       * Note: here index 1 is actually the first slide because of how Slick structure the infinite loop of the slider
       */
      slide.id = `${slideId}-${index}`;
    });
  }, [slideId]);

  // Modal states and refs
  const modalSlideId = useId();
  const modalSliderRef = useRef<Slider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  // Helper to add a11y enhancements to the modal slider
  const updateModalSliderA11y = useCallback(() => {
    if (!modalSliderRef.current) return;
    const modalTrackEl = modalSliderRef.current.innerSlider?.list?.querySelector('.slick-track');
    if (!modalTrackEl) return;

    modalTrackEl.setAttribute('aria-live', 'polite');
    (modalTrackEl as HTMLElement).id = modalSlideId;

    const modalSlidesEls = modalTrackEl.querySelectorAll('.slick-slide');
    modalSlidesEls.forEach((slide) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
    });
  }, [modalSlideId]);

  // When modal opens, set aria-live, id and roles on the modal slider track
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      timeoutRef.current = setTimeout(updateModalSliderA11y, 0);
    }
    return () => clearTimeout(timeoutRef.current!);
  }, [isModalOpen, updateModalSliderA11y]);

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
      {/* Modal with carousel */}
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
            <DialogBackdrop className={styles.dialogOverlay} />
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
                <DialogTitle className={styles.srOnly}>{`${ariaLabel} full screen view`}</DialogTitle>
                <div ref={modalContentRef} className={styles.contentWrapper}>
                  <button
                    type="button"
                    aria-label="Close modal"
                    onClick={closeModal}
                    className={styles.modalClose}
                  >
                    <Text icon="close" size={1} className={styles.modalCloseText}>Close</Text>
                  </button>
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
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};
