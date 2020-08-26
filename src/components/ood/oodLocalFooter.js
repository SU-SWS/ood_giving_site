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

            </address>
          </div>

          <div className="flex-md-6-of-12 flex-xl-3-of-12 ood-local-footer__cell">
            <nav aria-label="Local footer Office of Development links">
              {props.blok.headingGroupOod && (
                <h2 className="ood-local-footer__list-heading">{props.blok.headingGroupOod}</h2>
              )}
              <ul className="ood-local-footer__link-list">
                <li>
                  <a href="#">lorem ipsum dolor sit amit</a>
                </li>
                <li>
                  <a href="#">Vestibellum ultices nueue</a>
                </li>
                <li>
                  <a href="#">Blendius tellus</a>
                </li>
                <li>
                  <a href="#">Arnen cowalls</a>
                </li>
                <li>
                  <a href="#">Finibus</a>
                </li>
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
                <li>
                  <a href="#">Finibus</a>
                </li>
                <li>
                  <a href="#">lorem ipsum dolor sit amit</a>
                </li>
                <li>
                  <a href="#">Vestibellum ultices nueue</a>
                </li>
                <li>
                  <a href="#">Blendius tellus</a>
                </li>
                <li>
                  <a href="#">Arnen cowalls</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </div>
  </SbEditable>
)

export default OodLocalFooter
