import React from 'react'
import SbEditable from 'storyblok-react'
import Link from "gatsby-link"
import Components from "../components"

const OodLocalFooter = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-local-footer su-bg-white">
      <div className="centered-container">
        <div className="ood-local-footer__header">
          {props.blok.websiteLogo && props.blok.websiteLogo.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
        </div>
        <section className="flex-container ood-local-footer__content">

          <div className="flex-md-6-of-12 flex-xl-3-of-12 ood-local-footer__cell">
            {props.blok.contactHeading && (
              <h2 className="ood-local-footer__list-heading">{props.blok.contactHeading}</h2>
            )}
            <address className="ood-local-footer__address">
              {props.blok.addressLine1 &&
                <span>{props.blok.addressLine1}</span>
              }
              {props.blok.addressLine2 &&
                <span>{props.blok.addressLine2}</span>
              }
              {props.blok.addressLine3 &&
                <span>{props.blok.addressLine3}</span>
              }
              {props.blok.phone &&
                <span>{props.blok.phone}</span>
              }
              {props.blok.email &&
              <a href={`mailto:${props.blok.email}`}>{props.blok.email}</a>
              }
            </address>
          </div>

          <div className="flex-md-6-of-12 flex-xl-3-of-12 ood-local-footer__cell">
            <nav aria-label="Local footer Office of Development links">
              {props.blok.headingGroupOod && (
                <h2 className="ood-local-footer__list-heading">{props.blok.headingGroupOod}</h2>
              )}
              <ul className="ood-local-footer__link-list">
                {props.blok.linkGroupOod && props.blok.linkGroupOod.map((blok) => React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok,
                }))}
              </ul>
            </nav>
          </div>

          <div className="flex-md-6-of-12 flex-xl-3-of-12 ood-local-footer__cell">
            <h2 className="ood-local-footer__list-heading">Tax ID</h2>
            <p>{props.blok.taxId}</p>
          </div>

          <div className="flex-md-6-of-12 flex-xl-3-of-12 ood-local-footer__cell">
            <nav aria-label="Local footer information links">
              {props.blok.headingGroupInfo && (
                <h2 className="ood-local-footer__list-heading">{props.blok.headingGroupInfo}</h2>
              )}
              <ul className="ood-local-footer__link-list">
                {props.blok.linkGroupInfo && props.blok.linkGroupInfo.map((blok) => React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok,
                }))}
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </div>
  </SbEditable>
)

export default OodLocalFooter
