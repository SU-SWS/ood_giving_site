import React, { useState, useEffect } from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const OodQuoteSlider = ({blok}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const modalSliderSettings = {
    nextArrow: (
      <button>
        <span className="sr-only">Next Slide</span>
        <i className="fas fa-chevron-right" aria-hidden="true"></i>
      </button>
    ),
    prevArrow: (
      <button>
        <span className="sr-only">Previous Slide</span>
        <i className="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
    ),
    afterChange: (i) => {
      setActiveSlide(i);
    },
  }

  return (
    <SbEditable content={blok}>
      <div className="ood-quote-slider su-flex su-flex--column su-pt-2">
        {blok.title && <h2>{blok.title}</h2>  }
        <Slider className={"ood-quote-slider__wrapper"} {...modalSliderSettings}>
          {blok.quotes && blok.quotes.map((story) => React.createElement(Components(story.content.component), {
            key: story.content._uid,
            blok: story.content,
          }))}
        </Slider>
        <div className={"ood-quote-slider__current-position su-mod-type-1"}>
          {activeSlide + 1} / {blok.quotes.length}
          <span className="sr-only">{`Slide ${activeSlide + 1} of ${blok.quotes.length}`}</span>
        </div>
      </div>
    </SbEditable>
  )
}

export default OodQuoteSlider
