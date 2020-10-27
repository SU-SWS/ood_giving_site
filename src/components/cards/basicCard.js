import React from 'react'
import SbEditable from 'storyblok-react'
import Components from '../components.js'
import AspectRatioImage from '../media/aspectRatioImage'
import RichTextField from '../../utilities/richTextField'
import CreateBloks from "../../utilities/createBloks"

const BasicCard = (props) => {
  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h3";

  return (
    <SbEditable content={props.blok}>
      <article className={`ood-basic-card ood-shadow-shallow
               ${props.blok.orientation ? "ood-basic-card--horizontal" : ""}
               su-bg-${props.blok.backgroundColor}
               ${props.blok.backgroundColor !== "white" ? `su-border-color-${props.blok.backgroundColor}`: ""}
               ${(props.blok.orientation && props.blok.largeCardPadding === true) ? "su-pt-5" : ""}
               ${props.blok.largeCardPadding === true ? "su-px-5 su-pb-5" : "su-px-2 su-pb-2"}
               su-text-align-${props.blok.textAlign}
               ${(props.blok.image.filename != null && props.blok.showImage === true) ? "ood-basic-card--has-image" : "ood-basic-card--no-image"}
               ${(props.blok.backgroundColor !== "white" && props.blok.backgroundColor !== "fog-light") ? "su-text-white" : ""}`
      }>
        {(props.blok.image.filename != null && props.blok.showImage === true) && (
          <AspectRatioImage
            {...props}
            filename={props.blok.image.filename}
            alt={props.blok.image.alt}
            classPrefix={"ood-basic-card"}
            aspectRatio={props.blok.imageAspectRatio}
            imageSize={(props.blok.imageAspectRatio === "1x1" && props.blok.orientation === "horizontal") ? "thumbnail" : "card"}
          />
        )}
        <section className={`ood-basic-card__contents su-mx-auto
                 ${((props.blok.image.filename == null || props.blok.showImage === false) && props.blok.largeCardPadding === true)
                 ? "su-pt-5" : "su-pt-2"}
        `}>
          {props.blok.superheadline && (
            <span className="ood-basic-card__superhead su-uppercase su-semibold">{props.blok.superheadline}</span>
          )}
          {props.blok.headline && (
            <Heading className={`ood-basic-card__headline su-serif
                     ${props.blok.largeHeading === true ? "su-mod-type-4" : "su-mod-type-2"}`}>
              {props.blok.headline}
            </Heading>
          )}
          {props.blok.content &&
            <div className="ood-basic-card__body">
              <RichTextField data={props.blok.content}/>
            </div>
          }
          <CreateBloks blokSection={props.blok.ctaLink} />
        </section>
      </article>
    </SbEditable>
  )
};

export default BasicCard
