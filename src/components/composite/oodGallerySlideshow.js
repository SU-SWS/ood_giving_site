import React, { useState, useEffect } from 'react'
import SbEditable from 'storyblok-react'
import AspectRatioImage from '../media/aspectRatioImage';
import Slider from 'react-slick';
import Modal from './modal';
import RichTextField from '../../utilities/richTextField';
import 'slick-carousel/slick/slick.css';

const oodGallerySlideshow = (props) => {
  const [slideshow, setSlideshow] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [pagerOffset, setPagerOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const pagerWindow = React.createRef();
  const pager = React.createRef();

  const sliderSettings = {
    arrows: false,
    accessibility: true,
    lazyLoad: true,
    // This provides the JSX template for the lower half of the slider.
    appendDots: (dots) => {
      return (
        <div>
          {(props.blok.showCounter || props.blok.showExpandLink) &&
            <div className='gallery-slideshow--infobar'>
              {props.blok.showCounter && 
                <div className='gallery-slideshow--counter' aria-label={`Slide ${activeSlide + 1} of ${props.blok.slides.length}`}>
                  {`${activeSlide + 1}/${props.blok.slides.length}`}
                </div>
              }

              {props.blok.showExpandLink &&
                <div className='gallery-slideshow--expand'>
                  <button onClick={() => setModalOpen(true)}>Expand <i className="fas fa-expand"></i></button>
                </div>
              }
            </div>   
          }

          {props.blok.captionPlacement == 'beforeThumbnails' &&
            <div className="gallery-slideshow--caption gallery-slideshow--caption--before">
              <RichTextField data={props.blok.slides[activeSlide]['caption']}  />
            </div>
          }
          
          <div className='gallery-slideshow--controls'>
            <button className="gallery-slideshow--prev" onClick={clickPrev}>
              <span className="sr-only">Previous Slide</span>
              <i className="fas fa-chevron-left"></i>
              
            </button>
            <div className={`gallery-slideshow--pager-window ${showOverlay ? 'overlay' : ''}`} ref={pagerWindow}>
              <ul className="gallery-slideshow--pager" ref={pager} style={{transform: `translateX(${pagerOffset}px)`}}>
                {dots}
              </ul>
            </div>
            <button className="gallery-slideshow--next" onClick={clickNext}>
              <span className="sr-only">Next Slide</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {props.blok.captionPlacement == 'afterThumbnails' &&
            <div className="gallery-slideshow--caption gallery-slideshow--caption--after">
              <RichTextField data={props.blok.slides[activeSlide]['caption']}  />
            </div>
          }
        </div>
      )
    },
    customPaging: (i) => {
      const slide = props.blok.slides[i];
      return (
        <div className="gallery-slideshow--thumbnail" key={slide._uid}>
          <AspectRatioImage
            {...props}
            filename={slide.image.filename}
            alt={slide.image.alt}
            classPrefix={"ood-gallery-slide"}
            aspectRatio="16x9"
            imageSize="thumbnail"
          />
        </div>
      )
    },
    afterChange: (i) => {
      setActiveSlide(i);
      adjustPagerPosition();
    },
    dots: true,
    dotsClass: 'gallery-slideshow--bottom'
  }

  const modalSliderSettings = {
    nextArrow: (
      <button>
        <span className="sr-only">Next Slide</span>
        <i className="fas fa-chevron-right"></i>
      </button>
    ),
    prevArrow: (
      <button>
        <span className="sr-only">Previous Slide</span>
        <i className="fas fa-chevron-left"></i>
      </button>
    ),
    afterChange: (i) => {
      setActiveSlide(i);
    }
  }

  const adjustPagerPosition = () => {
    const windowBox = pagerWindow.current.getBoundingClientRect();
    const pagerBox = pager.current.getBoundingClientRect();
    const activeItem = pagerWindow.current.getElementsByClassName('slick-active')[0];
    const activeItemBox = activeItem.getBoundingClientRect();

    if (activeItemBox.right > windowBox.right) {
      const rightGutter = 26;
      const currentOffset = pagerBox.left - windowBox.left;
      const newOffset = currentOffset + (windowBox.right - activeItemBox.right) - rightGutter;
      setPagerOffset(newOffset);
      setShowOverlay(false);
    }
    else if (activeItemBox.left < windowBox.left) {
      const currentOffset = pagerBox.left - windowBox.left;
      const newOffset = currentOffset + (windowBox.left - activeItemBox.left);
      setPagerOffset(newOffset);
      setShowOverlay(true);
    }
  }

  const clickPrev = () => {
    slideshow.slickPrev();
  }

  const clickNext = () => {
    slideshow.slickNext();
  }

  return (
    <SbEditable content={props.blok}>
      <div className='gallery-slideshow centered-container su-pt-1 su-pb-1'>
        <div className='su-mx-auto flex-xl-10-of-12'>
          <Slider className="gallery-slideshow--slides" ref={(slider => setSlideshow(slider))} {...sliderSettings} >
              {props.blok.slides.map((slide, index) => {
                return (
                  <div className="gallery-slideshow--slide" index={1} key={slide._uid}>
                    <AspectRatioImage
                      {...props}
                      filename={slide.image.filename}
                      alt={slide.image.alt}
                      classPrefix={"ood-gallery-slide"}
                      aspectRatio="16x9"
                    />
                  </div>
                )
              })}
            </Slider>
        </div>
      </div>
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        outerContainerClasses="centered-container flex-container su-pt-1"
        innerContainerClasses="su-mx-auto flex-xl-10-of-12"
      >
        <div className="gallery-slideshow--modal-wrapper">
          <Slider className="gallery-slideshow--modal" {...modalSliderSettings} >
            {props.blok.slides.map((slide, index) => {
              return (
                <div className="gallery-slideshow--slide" index={1} key={slide._uid}>
                  <AspectRatioImage
                    {...props}
                    filename={slide.image.filename}
                    alt={slide.image.alt}
                    classPrefix={"ood-gallery-slide"}
                    aspectRatio="16x9"
                  />
                </div>
              )
            })}
          </Slider>
          <div className='gallery-slideshow--infobar'>
            <div className='gallery-slideshow--counter' aria-label={`Slide ${activeSlide + 1} of ${props.blok.slides.length}`}>
              {`${activeSlide + 1}/${props.blok.slides.length}`}
            </div>
          </div>
        </div>
        <div className="gallery-slideshow--caption">
          <RichTextField data={props.blok.slides[activeSlide]['caption']}  />
        </div>
      </Modal>
    </SbEditable>
  )
}

export default oodGallerySlideshow