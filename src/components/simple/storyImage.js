import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'
import RichTextField from '../richTextField'

const StoryImage = (props) => {
  let processedImg = "";
  if (props.blok.imageWidth === "edge-to-edge") {
    processedImg = transformImage(props.blok.image.filename, "/2000x0");
  }
  else if (props.blok.imageWidth !== "edge-to-edge") {
    processedImg = transformImage(props.blok.image.filename, "/1200x0");
  }

  return (
    <SbEditable content={props.blok}>
      <figure className={`su-media su-media--image ood-story-media su-bg-fog-light`}>
        <div className={`su-media__wrapper flex-container ${props.blok.imageWidth} ood-story-media__wrapper`}>
          <img className="ood-story-media__image" src={processedImg} alt={props.blok.image.alt} />
        </div>
        <figcaption className="su-media__caption centered-container ood-story-media__caption"><RichTextField data={props.blok.caption}/></figcaption>
      </figure>
    </SbEditable>
  )
}

export default StoryImage