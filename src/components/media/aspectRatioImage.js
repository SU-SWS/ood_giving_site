import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'

const AspectRatioImage = (props) => {
  let processedImg = "";
  const Element = props.element ? props.element : "figure";

  if (props.filename != null) {
    const dimensions = {
      width: props.filename.split('/')[5].split('x')[0] // Get image width from URL of storyblok image
    };

    // Only scale image if original image size is larger than intended size
    if (props.imageSize === "card" && dimensions.width > 600) {
      processedImg = transformImage(props.filename, "/600x0");
    }
    else if (props.imageSize === "thumbnail" && dimensions.width > 400) {
      processedImg = transformImage(props.filename, "/400x0");
    }
    else if ((props.imageSize === "header" || props.imageSize === "horizontal-card") && dimensions.width > 800) {
      processedImg = transformImage(props.filename, "/800x0");
    }
    else if (dimensions.width > 1000) {
      processedImg = transformImage(props.filename, "/1000x0");
    }
    else {
      processedImg = transformImage(props.blok.image.filename, "");
    }
  }

  return (
    <SbEditable content={props.blok}>
      <Element className={`su-media su-media--image ood-media ood-media--${props.aspectRatio}
              ${props.classPrefix ? `${props.classPrefix}__media` : ""}${props.otherClasses ? ` ${props.otherClasses}` : ""}`}>
        <div className={`su-media__wrapper su-aspect-ratio--${props.aspectRatio ? props.aspectRatio : "3x2"}`}>
          <img className={`ood-media__image
               ${props.classPrefix ? `${props.classPrefix}__image` : ""}
               su-obj-position-h-${props.visibleHorizontal}-v-${props.visibleVertical}`}
               src={processedImg}
               alt={props.alt ? props.alt : ""}
          />
        </div>
      </Element>
    </SbEditable>
  )
}

export default AspectRatioImage
