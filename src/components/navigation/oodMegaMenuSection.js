import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodMegaMenuSection = (props) => (
  <SbEditable content={props.blok}>
    <li className="ood-mega-nav__item--parent">
      <button className="ood-mega-nav__trigger">{props.blok.linkText}</button>
      <section className="ood-mega-nav__section su-bg-white">
        <div className="centered-container flex-container su-py-3">
          <div className="flex-lg-8-of-12 su-flex su-flex-col">
            <div className="flex-container">
              {props.blok.linkGroups && props.blok.linkGroups.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok,
              }))}
            </div>
            {props.blok.sectionCtaLink && props.blok.sectionCtaLink.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok,
            }))}
          </div>
          <div className="flex-lg-4-of-12">
            {props.blok.card && props.blok.card.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok,
            }))}
          </div>
        </div>
      </section>
    </li>
  </SbEditable>
)

export default OodMegaMenuSection
