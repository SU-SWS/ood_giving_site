import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'

const FullWidthImage = (props) => {
  const Element = props.element ? props.element : "figure";
  let largeImg, mediumImg, smallImg, originalImg = "";
  let imgSrcset, imgSizes, imgSrc = "";

  if (props.filename != null) {
    // Get image width from URL of storyblok image
    const imgWidth = props.filename.split('/')[5].split('x')[0];

    if (imgWidth >= 800) {
      smallImg = transformImage(props.filename, "/800x0");
    }

    if (imgWidth >= 1200) {
      mediumImg = transformImage(props.filename, "/1200x0");
    }

    if (imgWidth >= 2000) {
      largeImg = transformImage(props.filename, "/2000x0");
    }

    originalImg = transformImage(props.filename, "");

    imgSrcset = smallImg ? smallImg + " 800w" : "";
    imgSrcset += mediumImg ? "," + mediumImg + " 1200w " : "";
    imgSrcset += largeImg ? "," + largeImg + " 2000w " : "";

    // Set sizes attribute only if imgSrcset is not empty (imgSrcset is empty if image width is < 800px)
    if (imgSrcset) {
      imgSizes = "100vw";
    }

    // If image is > 2000px, use the resized 2000px version for the src. Otherwise use original image.
    imgSrc = largeImg || originalImg;
  }

  return (
    <SbEditable content={props.blok}>
      <Element className={`su-media
              ${props.classPrefix ? `${props.classPrefix}__media` : ""}${props.otherClasses ? ` ${props.otherClasses}` : ""}`}>
          <img className={`${props.classPrefix ? `${props.classPrefix}__image` : ""}
               su-obj-position-h-${props.visibleHorizontal}-v-${props.visibleVertical}`}
               srcSet={imgSrcset}
               sizes={imgSizes}
               src={imgSrc}
               alt={props.alt ? props.alt : ""}
          />
      </Element>
    </SbEditable>
  )
}

export default FullWidthImage
