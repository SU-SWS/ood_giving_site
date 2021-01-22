import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import CreateBloks from "../../utilities/createBloks"
import CenteredContainer from "../partials/centeredContainer"
import FlexCell from "../partials/flexCell"
import Heading from "../partials/heading"
import FullWidthImage from "../media/fullWidthImage"

const OodPoster = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`ood-poster su-bg-${props.blok.backgroundColor}`
      }>
        {props.blok.image.filename != null &&
          <FullWidthImage
            {...props}
            filename={props.blok.image.filename}
            classPrefix={"ood-poster"}
            otherClasses={props.blok.overlay ?? ""}
            visibleVertical={props.blok.visibleVertical}
          />
        }
        <CenteredContainer classes={"ood-poster__container"}>
          <div className={`flex-container ood-poster__row
             ${props.blok.cardPosition === "right" ? "su-flex-row-reverse" : ""}`
          }>
            <FlexCell sm={9} md={8} lg={7} xl={6} classes={"ood-poster__flex-cell"}>
              <div className={`ood-poster__card
                   su-bg-${props.blok.cardBackgroundColor} ood-shadow-shallow-dark
                   ${(props.blok.cardBackgroundColor !== "white" && props.blok.cardBackgroundColor !== "fog-light") ? "su-text-white" : ""}`
              }>
                {props.blok.headline && (
                  <Heading level={props.blok.headingLevel} defaultLevel={'h3'} weight={"semibold"} classes={"ood-poster__headline"}>{props.blok.headline}</Heading>
                )}
                {props.blok.bodyText &&
                  <div className="ood-poster__text">
                    <RichTextField data={props.blok.bodyText}/>
                  </div>
                }
                <CreateBloks blokSection={props.blok.ctaLink} />
              </div>
            </FlexCell>
          </div>
        </CenteredContainer>
      </div>
    </SbEditable>
  )
}

export default OodPoster
