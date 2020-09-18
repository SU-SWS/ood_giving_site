import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'
import RichTextField from '../richTextField'

const StoryImage = (props) => {
  let processedImg = "";

  if (props.blok.image) {
    if (props.blok.imageWidth === "su-w-full") {
      processedImg = transformImage(props.blok.image.filename, "/2000x0");
    }
    else if (props.blok.imageWidth === "centered-container") {
      processedImg = transformImage(props.blok.image.filename, "/1500x0");
    }
    else if (props.blok.imageWidth === "su-w-story") {
      processedImg = transformImage(props.blok.image.filename, "/1000x0");
    }
    else {
      processedImg = transformImage(props.blok.image.filename, "/800x0");
    }
  }

  return (
    <SbEditable content={props.blok}>
      <div className={`ood-story-media su-bg-${props.blok.backgroundColor} ${(props.blok.imageWidth === "su-w-full") ? props.blok.imageWidth : ""}`}>
        <div className={`${(props.blok.imageWidth !== "su-w-full")? "centered-container flex-container" : ""}`}>
          <figure className={`su-media su-media--image ood-story-media__figure
                  ${(props.blok.imageWidth === "su-w-story") ? "flex-md-10-of-12 flex-lg-8-of-12 flex-2xl-7-of-12" : ""}
                  ${(props.blok.imageWidth === "su-w-inset") ? "flex-sm-10-of-12 flex-md-8-of-12 flex-lg-6-of-12 flex-xl-5-of-12 flex-2xl-4-of-12" : ""}`}>
            <div className={`su-media__wrapper ood-story-media__wrapper`}>
              <img className="ood-story-media__image" src={processedImg} alt={props.blok.image.alt} />
            </div>
            <figcaption className={`su-media__caption ood-story-media__caption
                        ${props.blok.imageWidth === "su-w-full" ? "centered-container" : ""}`}>
              <RichTextField data={props.blok.caption}/></figcaption>
          </figure>
        </div>
      </div>
    </SbEditable>
  )
}

export default StoryImage