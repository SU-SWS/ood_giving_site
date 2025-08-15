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
import { Modal } from '@/components/Modal';
import { Slide } from './Slide';
import { Controls } from './Controls';
import { ThumbnailButton } from './ThumbnailButton';
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
  containerWidth = 'fit-container',
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
  const modalClickPrev = useCallback(() => modalSliderRef.current?.slickPrev(), []);
  const modalClickNext = useCallback(() => modalSliderRef.current?.slickNext(), []);

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
    beforeChange: (_oldIndex: number, newIndex: number) => {
      // update React state immediately when slider is about to change
      setActiveSlide(newIndex);
    },
    afterChange: (i: number) => {
      setActiveSlide(i);
      // ensure thumbnail pager is adjusted after animation/dom settled
      adjustPagerPosition(i);
    },
    // Prev/next buttons and additional UI are rendered outside the slider
  }), [adjustPagerPosition]);

  const modalSliderSettings = useMemo(() => ({
    arrows: false,
    accessibility: true,
    swipeToSlide: true,
    lazyLoad: 'ondemand' as const,
    afterChange: (i: number) => {
      setActiveSlide(i);
    },
    initialSlide: activeSlide,
  }), [activeSlide]);

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
        <div className={styles.widthWrapper(containerWidth)}>
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
          <div className={styles.sliderWrapper}>
            <Controls onPrev={clickPrev} onNext={clickNext} slideId={slideId} showExpandLink={showExpandLink} />
            <Slider
              className={styles.slider}
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
            {/* Thumbnail navigation */}
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
                {slides.map((s, i) => (
                  <li key={s._uid} className={i === activeSlide ? 'active' : ''}>
                    <ThumbnailButton
                      slide={s}
                      isActive={activeSlide === i}
                      onFocus={() => {
                        setActiveSlide(i);
                        adjustPagerPosition(i);
                        sliderRef.current?.slickGoTo(i);
                      }}
                      onClick={() => {
                        setActiveSlide(i);
                        sliderRef.current?.slickGoTo(i);
                        adjustPagerPosition(i);
                      }}
                      ariaLabel={`Slide ${i + 1}`}
                      aria-disabled={activeSlide === i}
                      aria-controls={`${slideId}-${i + 1}`}
                    />
                  </li>
                ))}
              </FlexBox>
            </nav>
          </div>
        </div>
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
          {/* Controls for modal slider */}
          <section aria-roledescription="carousel" aria-label={ariaLabel} className={styles.modalSliderRoot}>
            <div className={styles.modalSliderWrapper}>
              <Controls onPrev={modalClickPrev} onNext={modalClickNext} slideId={modalSlideId} isModal />
              <Slider ref={modalSliderRef} {...modalSliderSettings}>
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
