import React, { useState, useEffect } from 'react'
import SbEditable from 'storyblok-react'
import AspectRatioImage from '../media/aspectRatioImage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const oodGallerySlideshow = (props) => {
  const [slideshow, setSlideshow] = useState(null);
  const [thumbnails, setThumbnails] = useState(null);

  const sliderSettings = {
    arrows: false,
    asNavFor: thumbnails,
    fade: true,
    lazyLoad: true,
  }

  const PrevArrow = ({onClick}) => (
    <div className="prev-button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  )

  const NextArrow = ({onClick}) => (
    <div className="next-button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  )

  const thumbnailSettings = {
    slidesToShow: 6,
    asNavFor: slideshow,
    focusOnSelect: true,
    infinite: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  }

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
            <Slider 
              className="gallery-slideshow--thumbnails" 
              ref={slider => setThumbnails(slider)} 
              {...thumbnailSettings}
            >
              {props.blok.slides.map((slide) => {
                  return (
                    <div className="gallery-slideshow--thumbnail"key={slide._uid}>
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
                })}
            </Slider>
        </div>
      </div>
    </SbEditable>
  )
}

export default oodGallerySlideshow