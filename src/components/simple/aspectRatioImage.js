import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'

const AspectRatioImage = (props) => {
  let processedImg = "";

  if (props.blok.image.filename != null) {
    if (props.imageSize === "card") {
      processedImg = transformImage(props.blok.image.filename, "/600x0");
    }
    else if (props.imageSize === "thumbnail") {
      processedImg = transformImage(props.blok.image.filename, "/400x0");
    }
    else if (props.imageSize === "header" || props.imageSize === "h-card") {
      processedImg = transformImage(props.blok.image.filename, "/1000x0");
    }
    else {
      processedImg = transformImage(props.blok.image.filename, "/1200x0");
    }
  }

  return (
    <SbEditable content={props.blok}>
      <figure className={`su-media su-media--image ${props.classPrefix}__media`}>
        <div className={`su-media__wrapper su-aspect-ratio--${props.aspectRatio}`}>
          <img className={`ood-media__image ${props.classPrefix}__image
               su-obj-position-h-${props.blok.visibleHorizontal}-v-${props.blok.visibleVertical}`}
               src={processedImg}
               alt={props.blok.image.alt ? props.blok.image.alt : ""}
          />
        </div>
      </figure>
    </SbEditable>
  )
}

export default AspectRatioImage
