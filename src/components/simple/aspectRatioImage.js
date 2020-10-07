import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'

const AspectRatioImage = (props) => {
  let processedImg = "";

  if (props.filename != null) {
    if (props.imageSize === "card") {
      processedImg = transformImage(props.filename, "/600x0");
    }
    else if (props.imageSize === "thumbnail") {
      processedImg = transformImage(props.filename, "/400x0");
    }
    else if (props.imageSize === "header" || props.imageSize === "horizontal-card") {
      processedImg = transformImage(props.filename, "/800x0");
    }
    else {
      processedImg = transformImage(props.filename, "/1200x0");
    }
  }

  return (
    <SbEditable content={props.blok}>
      <figure className={`su-media su-media--image ood-media ${props.classPrefix ? `${props.classPrefix}__media` : ""}`}>
        <div className={`su-media__wrapper su-aspect-ratio--${props.aspectRatio ? `${props.aspectRatio}` : "3x2"}`}>
          <img className={`ood-media__image
               ${props.classPrefix ? `${props.classPrefix}__image` : ""}
               su-obj-position-h-${props.blok.visibleHorizontal}-v-${props.blok.visibleVertical}`}
               src={processedImg}
               alt={props.alt ? props.alt : ""}
          />
        </div>
      </figure>
    </SbEditable>
  )
}

export default AspectRatioImage
