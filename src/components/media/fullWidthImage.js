import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'

const FullWidthImage = (props) => {
  let largeImg, mediumImg, smallImg, originalImg = "";
  let imgSrcset = "";
  const Element = props.element ? props.element : "figure";

  if (props.filename != null) {
    const dimensions = {
      width: props.filename.split('/')[5].split('x')[0] // Get image width from URL of storyblok image
    };

    smallImg = transformImage(props.filename, "/800x0");
    mediumImg = transformImage(props.filename, "/1200x0");
    largeImg = transformImage(props.filename, "/2000x0");
    originalImg = transformImage(props.filename, "");

    imgSrcset = smallImg ? smallImg + " 800w" : "";
    imgSrcset += mediumImg ? "," + mediumImg + " 1200w " : "";
    imgSrcset += largeImg ? "," + largeImg + " 2000w " : "";
  }

  return (
    <SbEditable content={props.blok}>
      <Element className={`su-media
              ${props.classPrefix ? `${props.classPrefix}__media` : ""}${props.otherClasses ? ` ${props.otherClasses}` : ""}`}>
          <img className={`${props.classPrefix ? `${props.classPrefix}__image` : ""}
               su-obj-position-h-${props.visibleHorizontal}-v-${props.visibleVertical}`}
               srcSet={imgSrcset}
               sizes={"100vw"}
               src={originalImg}
               alt={props.alt ? props.alt : ""}
          />
      </Element>
    </SbEditable>
  )
}

export default FullWidthImage
