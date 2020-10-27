import React from "react"
import Wrapper from "../../components/layout/wrapper"
import PrivateWrapper from "../../components/auth/privateWrapper"
import { Router } from "@reach/router"
import LoginButton from "../../components/auth/LoginButton"
import LogoutButton from "../../components/auth/LogoutButton"
import { getUser } from "../../utilities/auth"

const Authd = (props) => {

  const user = getUser()
  let HelloUser = `Continue as guest or ...`

  if (user) {
    HelloUser = `Hello ${user.name}`
  }

  return (
    <>

      <Router basepath="/user">
        <PrivateWrapper path="/test" component={Wrapper} />
      </Router>

      <header className="ood-header su-bg-white su-border-top-10px su-border-color-cardinal-red"><a href="#main-content"
          className="su-skiplinks">Skip to main content</a>
        <div className="centered-container">
          <nav className="ood-submenu" aria-label="Sub Menu">
            <ul>
              <li><a href="https://givinghistory.stanford.edu/" className="su-link--external">My Giving History</a></li>
              <li><a href="/about/contact-us/">Contact Us</a></li>
            </ul><a href="https://makeagift.stanford.edu/?olc=06301&amp;cturl=close" className="su-button">Make a Gift</a>
          </nav>
          <div className="su-lockup su-lockup--option-n"><a aria-current="page" className="" href="/">
              <div className="su-lockup__cell1">
                <div className="su-lockup__wordmark-wrapper"><span className="su-lockup__wordmark">Stanford</span></div>
              </div>
              <div className="su-lockup__cell2"><span className="su-lockup__line1">Giving</span></div>
            </a></div>
          <nav className="ood-mega-nav no-js" aria-label="Main Menu"><button
              className="ood-mega-nav__toggle su-mr-none su-ml-auto" aria-expanded="false">Menu</button>
            <ul className="ood-mega-nav__menu-lv1 su-list-none">
              <li className="ood-mega-nav__item"><a className="ood-mega-nav__link" href="/areas-to-support/">Areas to
                  Support</a></li>
              <li className="ood-mega-nav__item"><a className="ood-mega-nav__link" href="/why-give/">Why Give</a></li>
              <li className="ood-mega-nav__item--parent"><button className="ood-mega-nav__trigger">How to Make a Gift</button>
                <section className="ood-mega-nav__section su-bg-white">
                  <div className="centered-container flex-container su-py-3">
                    <div className="flex-lg-8-of-12 flex-2xl-9-of-12 su-flex su-flex-col">
                      <div className="flex-container">
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">Give Now</h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a href="https://makeagift.stanford.edu/get/page/makeagift"
                                className="ood-mega-nav__link su-link--external">Online</a></li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/test-items/yvonne-test-mega-menu-in-page/">Phone or mail</a></li>
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">Stocks, securities,
                                or wire transfers</a></li>
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">Matching gifts</a>
                            </li>
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">International
                                gifts</a></li>
                            <li className="ood-mega-nav__item"><a
                                href="https://web.stanford.edu/dept/OOD/cgi-bin/tsf/reunion-campaigns/ "
                                className="ood-mega-nav__link su-link--external">Reunion campaigns</a></li>
                          </ul>
                        </div>
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">Give Over Time</h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a href="https://makeapledge.stanford.edu/"
                                className="ood-mega-nav__link su-link--external">New pledge</a></li>
                            <li className="ood-mega-nav__item"><a href="https://makeapledgepayment.stanford.edu/"
                                className="ood-mega-nav__link su-link--external">Make a pledge payment</a></li>
                            <li className="ood-mega-nav__item"><a href="" className="ood-mega-nav__link su-link--external">Give
                                a recurring gift</a></li>
                          </ul>
                        </div>
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">Plan Your Gift</h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/how-to-make-a-gift/planned-giving/">Get started here</a></li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/how-to-make-a-gift/planned-giving/bequests-and-estate-plan-gifts/">Bequests and
                                estate plan gifts</a></li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/how-to-make-a-gift/planned-giving/life-income-gifts/">Life income gifts</a></li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/how-to-make-a-gift/planned-giving/donor-advised-funds/">Donor advised funds</a>
                            </li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/how-to-make-a-gift/planned-giving/charitable-lead-trusts/">Charitable lead
                                trusts</a></li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/how-to-make-a-gift/planned-giving/assets-to-give/">Assets to give</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="ood-cta su-block su-text-align-left"><a
                          className="su-link ood-cta__link su-link--action su-text-digital-red su-after-bg-digital-red su-text-hocus-sky-dark su-after-bg-hocus-sky-dark"
                          href="/how-to-make-a-gift/">All the ways to make a gift</a></div>
                    </div>
                    <div className="flex-lg-4-of-12 flex-2xl-3-of-12">
                      <article className="ood-mega-nav__card"><a className="ood-mega-nav__card__link su-no-underline"
                          href="/areas-to-support/the-stanford-fund/">
                          <figure className="su-media su-media--image ood-media ood-mega-nav__card__media">
                            <div className="su-media__wrapper su-aspect-ratio--3x2"><img className="ood-media__image
               ood-mega-nav__card__image
               su-obj-position-h-undefined-v-undefined"
                                src="https://img2.storyblok.com/600x0/f/78141/2000x1333/544bdad591/796a5645.jpg" alt="" />
                            </div>
                          </figure>
                          <section className="ood-mega-nav__card-content su-text-white su-bg-digital-red">
                            <h3 className="ood-mega-nav__card-headline su-semibold">Give through The Stanford Fund to
                              support undergrads.</h3>
                            <p className="ood-mega-nav__card-cta su-after-bg-white su-after-bg-hocus-white su-mb-none
          su-link--action">About The Stanford Fund</p>
                          </section>
                        </a></article>
                    </div>
                  </div>
                </section>
              </li>
              <li className="ood-mega-nav__item--parent"><button className="ood-mega-nav__trigger">Get Involved</button>
                <section className="ood-mega-nav__section su-bg-white">
                  <div className="centered-container flex-container su-py-3">
                    <div className="flex-lg-8-of-12 flex-2xl-9-of-12 su-flex su-flex-col">
                      <div className="flex-container">
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">Donor Communities</h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">Learn about donor
                                communities</a></li>
                            <li className="ood-mega-nav__item"><a
                                href="https://web.stanford.edu/dept/OOD/communications/stanfordloyal/#"
                                className="ood-mega-nav__link su-link--external">Stanford Loyal</a></li>
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">Founding Grant
                                Society</a></li>
                            <li className="ood-mega-nav__item"><a
                                href="https://web.stanford.edu/dept/OOD/dss/founders-circle/index.html"
                                className="ood-mega-nav__link su-link--external">Founders’ Circle</a></li>
                            <li className="ood-mega-nav__item"><a href="http://honorrolls.stanford.edu/"
                                className="ood-mega-nav__link su-link--external">Honor rolls</a></li>
                          </ul>
                        </div>
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">Give With Your Class</h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a
                                href="https://web.stanford.edu/dept/OOD/cgi-bin/tsf/reunion-campaigns/"
                                className="ood-mega-nav__link su-link--external">Undergraduate Reunion campaigns</a></li>
                            <li className="ood-mega-nav__item"><a href="https://www.gsb.stanford.edu/alumni/reunions"
                                className="ood-mega-nav__link su-link--external">Business School Reunion</a></li>
                            <li className="ood-mega-nav__item"><a href="https://conferences.law.stanford.edu/alumniweekend/"
                                className="ood-mega-nav__link su-link--external">Law School Reunion</a></li>
                          </ul>
                        </div>
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">Other Ways to Get Involved
                          </h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">Stanford Fund
                                volunteers</a></li>
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">Reunion
                                volunteers</a></li>
                            <li className="ood-mega-nav__item"><a
                                href="https://alumni.stanford.edu/get/page/landing/volunteering"
                                className="ood-mega-nav__link su-link--external">Stanford Alumni Association</a></li>
                            <li className="ood-mega-nav__item"><a href="https://oval.stanford.edu/"
                                className="ood-mega-nav__link su-link--external">Outreach Volunteer Alumni Link (OVAL)</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex-lg-4-of-12 flex-2xl-3-of-12">
                      <article className="ood-mega-nav__card"><a
                          href="https://web.stanford.edu/dept/OOD/communications/stanfordloyal/#"
                          className="ood-mega-nav__card__link su-no-underline">
                          <figure className="su-media su-media--image ood-media ood-mega-nav__card__media">
                            <div className="su-media__wrapper su-aspect-ratio--3x2"><img className="ood-media__image
               ood-mega-nav__card__image
               su-obj-position-h-undefined-v-undefined"
                                src="https://img2.storyblok.com/600x0/f/78141/5534x3689/a2b8754159/img_1702.jpg" alt="" />
                            </div>
                          </figure>
                          <section className="ood-mega-nav__card-content su-text-white su-bg-digital-red">
                            <h3 className="ood-mega-nav__card-headline su-semibold">Join our community of loyal supporters
                              by giving each year.</h3>
                            <p className="ood-mega-nav__card-cta su-after-bg-white su-after-bg-hocus-white su-mb-none
          su-link--external">Be Stanford Loyal</p>
                          </section>
                        </a></article>
                    </div>
                  </div>
                </section>
              </li>
              <li className="ood-mega-nav__item--parent"><button className="ood-mega-nav__trigger">About</button>
                <section className="ood-mega-nav__section su-bg-white">
                  <div className="centered-container flex-container su-py-3">
                    <div className="flex-lg-8-of-12 flex-2xl-9-of-12 su-flex su-flex-col">
                      <div className="flex-container">
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">Office of Development</h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/about/office-of-development/">Get to know us</a></li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/about/contact-us/">Contact us</a></li>
                          </ul>
                        </div>
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <h3 className="ood-mega-nav__link-group-heading su-uppercase su-bold">About Giving</h3>
                          <ul className="ood-mega-nav__menu-lv2 su-list-none">
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">Gift policies</a>
                            </li>
                            <li className="ood-mega-nav__item"><a href="//" className="ood-mega-nav__link">About endowed
                                giving</a></li>
                            <li className="ood-mega-nav__item"><a className="ood-mega-nav__link"
                                href="/about/frequently-asked-questions/">Frequently asked questions</a></li>
                          </ul>
                        </div>
                        <div className="ood-mega-nav__link-group flex-lg-4-of-12">
                          <ul className="ood-mega-nav__menu-lv2 su-list-none"></ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex-lg-4-of-12 flex-2xl-3-of-12">
                      <article className="ood-mega-nav__card"><a className="ood-mega-nav__card__link su-no-underline"
                          href="/about/contact-us/">
                          <figure className="su-media su-media--image ood-media ood-mega-nav__card__media">
                            <div className="su-media__wrapper su-aspect-ratio--3x2"><img className="ood-media__image
               ood-mega-nav__card__image
               su-obj-position-h-undefined-v-undefined"
                                src="https://img2.storyblok.com/600x0/f/78141/2000x1332/03fad0d7fb/alexis-anneke_june-2017-2000.jpg"
                                alt="" /></div>
                          </figure>
                          <section className="ood-mega-nav__card-content su-text-white su-bg-digital-red">
                            <h3 className="ood-mega-nav__card-headline su-semibold">We’re here to help you make your biggest
                              impact.</h3>
                            <p className="ood-mega-nav__card-cta su-after-bg-white su-after-bg-hocus-white su-mb-none
          su-link--action">Connect with the giving team</p>
                          </section>
                        </a></article>
                    </div>
                  </div>
                </section>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={`ood-landing-page su-bg-fog-light`}>
        <main id="main-content" className={`ood-landing-page__main`}>
          <article className={`su-bg-fog-light`}>
            <section className={`ood-interior-page__body`}>
              <div className={`centered-container flex-container`}>
                <div className={`ood-interior-page__body-content flex-lg-8-of-12`}>
                  <p>&nbsp;</p>
                  <h1>User Page</h1>
                  <p>{HelloUser}</p>
                  <LoginButton>Login</LoginButton>
                  <LogoutButton>Logout</LogoutButton>
                  <p>&nbsp;</p>
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>

      <footer>
        <div className="su-global-footer">
          <div className="su-global-footer__container">
            <div className="su-global-footer__brand"><a className="su-logo"
                href="https://www.stanford.edu">Stanford<br />University</a></div>
            <div className="su-global-footer__content">
              <nav aria-label="global footer menu">
                <ul className="su-global-footer__menu su-global-footer__menu--global">
                  <li><a href="https://www.stanford.edu">Stanford Home</a></li>
                  <li><a href="https://visit.stanford.edu/plan/">Maps &amp; Directions</a></li>
                  <li><a href="https://www.stanford.edu/search/">Search Stanford</a></li>
                  <li><a href="https://emergency.stanford.edu">Emergency Info</a></li>
                </ul>
                <ul className="su-global-footer__menu su-global-footer__menu--policy">
                  <li><a href="https://www.stanford.edu/site/terms/" title="Terms of use for sites">Terms of Use</a>
                  </li>
                  <li><a href="https://www.stanford.edu/site/privacy/" title="Privacy and cookie policy">Privacy</a>
                  </li>
                  <li><a href="https://uit.stanford.edu/security/copyright-infringement"
                      title="Report alleged copyright infringement">Copyright</a></li>
                  <li><a href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                      title="Ownership and use of Stanford trademarks and images">Trademarks</a></li>
                  <li><a href="http://exploredegrees.stanford.edu/nonacademicregulations/nondiscrimination/"
                      title="Non-discrimination policy">Non-Discrimination</a></li>
                  <li><a href="https://www.stanford.edu/site/accessibility"
                      title="Report web accessibility issues">Accessibility</a></li>
                </ul>
              </nav>
              <div className="su-global-footer__copyright"><span>© Stanford University.</span><span>&nbsp; Stanford,
                  California 94305.</span></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Authd
