import React, { useState, useRef } from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const OodQuoteSlider = ({blok}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideInProgress, setSlideInProgress] = useState(false);
  const slider = useRef(null);

  const sliderSettings = {
    nextArrow: (
      <button>
        <span className="sr-only">Next Slide: {`${activeSlide + 1 === blok.quotes.length ? '1' : activeSlide + 2} of ${blok.quotes.length}`}</span>
        <i className="fas fa-chevron-right" aria-hidden="true"></i>
      </button>
    ),
    prevArrow: (
      <button>
        <span className="sr-only">Previous Slide: {`${activeSlide === 0 ? blok.quotes.length : activeSlide} of ${blok.quotes.length}`}</span>
        <i className="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
    ),
    beforeChange: () => {
      setSlideInProgress(true);
    },
    afterChange: (i) => {
      setActiveSlide(i);
      setSlideInProgress(false);
      slider.current.querySelector(".slick-current").focus()
    },
  }

  return (
    <SbEditable content={blok}>
      <div className={`ood-quote-slider su-flex su-flex--column ${slideInProgress ? 'ood-quote-slider--progress' : ''}`} ref={slider}>
        <Slider className={"ood-quote-slider__wrapper"} {...sliderSettings}>
          {blok.quotes && blok.quotes.map((story) => React.createElement(Components(story.content.component), {
            key: story.content._uid,
            blok: story.content,
          }))}
        </Slider>
        <div className={"ood-quote-slider__current-position su-mod-type-1"}>
          <span aria-hidden="true"> {activeSlide + 1} / {blok.quotes.length}</span>
          <span className="sr-only">{`Slide ${activeSlide + 1} of ${blok.quotes.length}`}</span>
        </div>
      </div>
    </SbEditable>
  )
}

export default OodQuoteSlider
