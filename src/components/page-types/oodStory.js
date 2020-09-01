import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import transformImage from '../../utilities/transformImage'
import Components from "../components"

const OodStory = (props) => {
  let processedHeroImg = "";
  if (props.blok.heroImage.filename) {
    processedHeroImg = transformImage(props.blok.heroImage.filename, "/2000x0");
  }

  return (
    <article className="ood-story">
      {props.blok.heroImage && (
        <figure className={`su-media ood-story__media ${props.blok.overlay && (props.blok.overlay)}`}>
          <img src={processedHeroImg} alt=""
               className={`ood-story__image su-obj-position-h-center-v-${props.blok.visibleVertical}`}
          />
        </figure>
      )}
      <div>
        <h1>{props.blok.title}</h1>
        {props.blok.intro && (
          <p class="su-intro-text ood-intro-text">{props.blok.intro}</p>
        )}
      </div>
    </article>
  )
}

export default OodStory