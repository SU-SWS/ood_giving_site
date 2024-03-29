import React from 'react';
import SbEditable from 'storyblok-react';

const globalFooter = (props) => (
  <SbEditable content={props.blok}>
    <div
      className={
        props.blok.color
          ? 'su-global-footer ' + props.blok.color
          : 'su-global-footer'
      }
    >
      <div className="su-global-footer__container">
        <div className="su-global-footer__brand">
          <a className="su-logo" href="https://www.stanford.edu">
            Stanford
            <br />
            University
          </a>
        </div>
        <div className="su-global-footer__content">
          <nav aria-label="global footer menu">
            <ul className="su-global-footer__menu su-global-footer__menu--global">
              <li>
                <a href="https://www.stanford.edu">Stanford Home</a>
              </li>
              <li>
                <a href="https://visit.stanford.edu/plan/">
                  Maps &amp; Directions
                </a>
              </li>
              <li>
                <a href="https://www.stanford.edu/search/">Search Stanford</a>
              </li>
              <li>
                <a href="https://emergency.stanford.edu">Emergency Info</a>
              </li>
            </ul>
            <ul className="su-global-footer__menu su-global-footer__menu--policy">
              <li>
                <a
                  href="https://www.stanford.edu/site/terms/"
                  title="Terms of use for sites"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="https://www.stanford.edu/site/privacy/"
                  title="Privacy and cookie policy"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="https://uit.stanford.edu/security/copyright-infringement"
                  title="Report alleged copyright infringement"
                >
                  Copyright
                </a>
              </li>
              <li>
                <a
                  href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                  title="Ownership and use of Stanford trademarks and images"
                >
                  Trademarks
                </a>
              </li>
              <li>
                <a
                  href="http://exploredegrees.stanford.edu/nonacademicregulations/nondiscrimination/"
                  title="Non-discrimination policy"
                >
                  Non-Discrimination
                </a>
              </li>
              <li>
                <a
                  href="https://www.stanford.edu/site/accessibility"
                  title="Report web accessibility issues"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>
          <div className="su-global-footer__copyright">
            <span>&copy; Stanford University.</span>
            <span>&nbsp; Stanford, California 94305.</span>
          </div>
        </div>
      </div>
    </div>
  </SbEditable>
);

export default globalFooter;
