'use client';

import {
  useCallback, useEffect, useMemo, useState, useRef, useId,
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
import { SrOnlyText, Text } from '@/components/Typography';
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
  ariaLabel,
  showCounter,
  showExpandLink,
  containerWidth,
  mt,
  mb,
  ...props
}: GallerySlideshowProps) => {
  const slideId = useId();
  const modalSlideId = useId();
  const [activeSlide, setActiveSlide] = useState(0);
  const [pagerOffset, setPagerOffset] = useState(0);
  const pagerWindowRef = useRef<HTMLDivElement | null>(null);
  const pagerRef = useRef<HTMLUListElement | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  // Modal states and refs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const modalSliderRef = useRef<Slider | null>(null);

  // Helper to set aria-live, id, and role on modal slider track
  const updateModalTrackAttrs = useCallback(() => {
    if (!modalSliderRef.current) return;
    const modalTrackEl = modalSliderRef.current.innerSlider?.list?.querySelector('.slick-track');
    if (!modalTrackEl) return;
    modalTrackEl.setAttribute('aria-live', 'polite');
    (modalTrackEl as HTMLElement).id = modalSlideId;
    modalTrackEl.querySelectorAll('.slick-slide').forEach((slide) => slide.setAttribute('role', 'slide'));
  }, [modalSlideId]);

  // Add aria-live and id to the main slider's slick-track for accessibility
  useEffect(() => {
    if (!sliderRef.current) return;
    const trackEl = sliderRef.current.innerSlider?.list?.querySelector('.slick-track');
    if (!trackEl) return;

    trackEl.setAttribute('aria-live', 'polite');
    (trackEl as HTMLElement).id = slideId;
    // Set role="slide" on each slide for accessibility
    const slidesEls = trackEl.querySelectorAll('.slick-slide');
    slidesEls.forEach((slide) => slide.setAttribute('role', 'slide'));
  }, [slideId]);

  // When modal opens, set aria-live, id and roles on the modal slider track
  useEffect(() => {
    if (!isModalOpen) return;
    // Delay to allow modal slider DOM to render
    const id = setTimeout(updateModalTrackAttrs, 0);
    return () => clearTimeout(id);
  }, [isModalOpen, updateModalTrackAttrs]);

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
        <nav aria-label={`${ariaLabel || 'Image gallery'} thumbnails`} ref={pagerWindowRef} className={styles.pagerWindow}>
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
      updateModalTrackAttrs();
    },
    initialSlide: activeSlide,
  }), [activeSlide, modalSlideId, updateModalTrackAttrs]);

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
                <DialogTitle className={styles.srOnly}>{`${ariaLabel || 'Image gallery' } full screen view`}</DialogTitle>
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
                  <section aria-roledescription="carousel" aria-label={`${ariaLabel || 'Image gallery'}`}>
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
