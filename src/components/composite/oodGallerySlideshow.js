import React, { useState, useEffect } from 'react'
import SbEditable from 'storyblok-react'
import AspectRatioImage from '../media/aspectRatioImage';
import Slider from 'react-slick';
import RichTextField from '../../utilities/richTextField';
import 'slick-carousel/slick/slick.css';

const oodGallerySlideshow = (props) => {
  const [slideshow, setSlideshow] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [pagerOffset, setPagerOffset] = useState(0);
  const pagerWindow = React.createRef();
  const pager = React.createRef();

  const sliderSettings = {
    arrows: false,
    lazyLoad: true,
    appendDots: (dots) => {
      return (
        <div>
          <div className='gallery-slideshow--infobar'>
            {props.blok.showCounter && 
              <div className='gallery-slideshow--counter'>
                {`${activeSlide + 1}/${props.blok.slides.length}`}
              </div>
            }

            {props.blok.showExpandLink &&
              <div className='gallery-slideshow--expand'>
                <a href='return javascript:void(0);'>Expand <span className="fas fa-expand"></span></a>
              </div>
            }
          </div>
          
          {props.blok.captionPlacement == 'beforeThumbnails' &&
            <div className="gallery-slideshow--caption">
              <RichTextField data={props.blok.slides[activeSlide]['caption']}  />
            </div>
          }
          
          <div className='gallery-slideshow--controls'>
            <PrevArrow className="gallery-slideshow--prev" />
            <div className="gallery-slideshow--pager-window" ref={pagerWindow}>
              <ul className="gallery-slideshow--pager" ref={pager} style={{transform: `translateX(${pagerOffset}px)`}}>
                {dots}
              </ul>
            </div>
            <NextArrow />
          </div>

          {props.blok.captionPlacement == 'afterThumbnails' &&
            <div className="gallery-slideshow--caption">
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
      const windowBox = pagerWindow.current.getBoundingClientRect();
      const pagerBox = pager.current.getBoundingClientRect();
      const activeItem = pagerWindow.current.getElementsByClassName('slick-active')[0];
      const activeItemBox = activeItem.getBoundingClientRect();
      

      if (activeItemBox.right > windowBox.right) {
        const rightGutter = 26;
        const currentOffset = pagerBox.left - windowBox.left;
        const newOffset = currentOffset + (windowBox.right - activeItemBox.right) - rightGutter;
        setPagerOffset(newOffset);
      }
      else if (activeItemBox.left < windowBox.left) {
        const currentOffset = pagerBox.left - windowBox.left;
        const newOffset = currentOffset + (windowBox.left - activeItemBox.left);
        console.log('newOffset', newOffset);
        setPagerOffset(newOffset);
      }
      
    },
    dots: true,
    dotsClass: 'gallery-slideshow--bottom'
  }

  const clickPrev = () => {
    slideshow.slickPrev();
  }

  const clickNext = () => {
    slideshow.slickNext();
  }

  const PrevArrow = () => (
    <button className="gallery-slideshow--prev" onClick={clickPrev}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  )

  const NextArrow = () => (
    <button className="gallery-slideshow--next" onClick={clickNext}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )

  return (
    <SbEditable content={props.blok}>
      <div className='centered-container'>
        <div className='su-mx-auto flex-xl-10-of-12'>
          <Slider className="gallery-slideshow--slides" ref={(slider => setSlideshow(slider))} {...sliderSettings} >
              {props.blok.slides.map((slide) => {
                return (
                  <div className="gallery-slideshow--slide"key={slide._uid}>
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
    </SbEditable>
  )
}

export default oodGallerySlideshow