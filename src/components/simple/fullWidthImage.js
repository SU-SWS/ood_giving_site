import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'

const FullWidthImage = (props) => {
  let processedImg = "";

  if (props.filename != null) {
    processedImg = transformImage(props.filename, "/2000x0");
  }

  return (
    <SbEditable content={props.blok}>
      <figure className={`su-media su-media--image ood-media ${props.classPrefix ? `${props.classPrefix}__media` : ""}${props.otherClasses ? ` ${props.otherClasses}` : ""}`}>
        <div className={`su-media__wrapper`}>
          <img className={`ood-media__image
               ${props.classPrefix ? `${props.classPrefix}__image` : ""}
               su-obj-position-h-${props.visibleHorizontal}-v-${props.visibleVertical}`}
               src={processedImg}
               alt={props.alt ? props.alt : ""}
          />
        </div>
      </figure>
    </SbEditable>
  )
}

export default FullWidthImage
