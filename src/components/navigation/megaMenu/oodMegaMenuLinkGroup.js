import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"
import FlexCell from "../../partials/flexCell"

const OodMegaMenuLinkGroup = (props) => (
  <SbEditable content={props.blok}>
    <FlexCell md={4} classes={"ood-mega-nav__link-group"}>
      {props.blok.heading &&
        <h3 className={`ood-mega-nav__link-group-heading su-uppercase su-bold`}>{props.blok.heading}</h3>
      }
      {props.blok.links != "" &&
        <ul className="ood-mega-nav__menu-lv2 su-list-none">
          <CreateBloks blokSection={props.blok.links}/>
        </ul>
      }
    </FlexCell>
  </SbEditable>
)

export default OodMegaMenuLinkGroup
