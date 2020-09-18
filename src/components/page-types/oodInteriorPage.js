import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components"
import HeaderNoImage from '../partials/headerNoImage'
import { Helmet } from 'react-helmet'

const HeaderWithImage = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--has-image`}>
      <div className={`ood-interior-page__header-title-wrapper su-pt-6 su-pb-5 su-bg-${props.blok.headerBackgroundColor}`}>
        <div className={`centered-container flex-container`}>
          <h1 className="ood-interior-page__title flex-lg-6-of-12 flex-xl-5-of-12 flex-2xl-6-of-12 su-serif su-text-white su-text-align-left">{props.blok.title}</h1>
          <figure className="su-media flex-lg-6-of-12 flex-xl-7-of-12 flex-2xl-6-of-12 ood-interior-page__header-media">
            <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
              <img className="ood-interior-page__image" src={props.blok.headerImage.filename ? props.blok.headerImage.filename : ""} alt="" />
            </div>
          </figure>
        </div>
      </div>
      <div className={`ood-interior-page__header-intro-wrapper su-py-6 su-bg-white`}>
        <div className={`centered-container flex-container`}>
          {props.blok.intro && (
            <div className="su-intro-text ood-interior-page__intro flex-xl-8-of-12">
              <RichTextField data={props.blok.intro}/>
            </div>
          )}
        </div>
      </div>
    </header>
  </SbEditable>
);

const HeaderMinimal = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--minimal su-bg-fog-light su-py-7`}>
      <div className={`centered-container`}>
        <h1 className="ood-interior-page__title su-serif su-text-align-center">{props.blok.title}</h1>
      </div>
    </header>
  </SbEditable>
);

const BodyLeftSidebar = (props) => (
  <SbEditable content={props.blok}>
    <aside className="ood-interior-page__body-sidebar flex-lg-4-of-12 flex-xl-3-of-12">
      {props.blok.contentMenu && props.blok.contentMenu.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </aside>
    <div className="ood-interior-page__body-content flex-lg-8-of-12">
      {props.blok.pageContent && props.blok.pageContent.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </div>
  </SbEditable>
);

const BodyNoSidebar = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-interior-page__body-content flex-lg-8-of-12 flex-xl-7-of-12 flex-2xl-6-of-12 su-mx-auto">
      {props.blok.pageContent && props.blok.pageContent.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </div>
  </SbEditable>
)

const OodInteriorPage = (props) => {
  let numIconCards;

  if (props.blok.iconCards == null) {
    numIconCards = 0;
  }
  else {
    numIconCards = Object.keys(props.blok.iconCards).length;
  }

  return (
    <>
      <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
      <SbEditable content={props.blok}>
        {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        <main id="main-content"
              className={`ood-interior-page ood-interior-page--${props.blok.headerStyle}`}
        >
          <article className={`su-bg-fog-light`}>
            {props.blok.headerStyle === "has-image" &&
              <HeaderWithImage {...props}/>
            }
            {props.blok.headerStyle === "no-image" &&
              <HeaderNoImage {...props}/>
            }
            {props.blok.headerStyle === "minimal" &&
              <HeaderMinimal {...props}/>
            }
            <section className="ood-interior-page__body">
              {props.blok.bodyTitle &&
                <header className="centered-container ood-interior-page__body-header su-text-align-left">
                  <h2 className="ood-interior-page__body-header-title su-serif su-bold ood-has-tab-before">{props.blok.bodyTitle}</h2>
                </header>
              }
              <div className="centered-container flex-container">
                {props.blok.layout === "no-sidebar" &&
                  <BodyNoSidebar {...props}/>
                }
                {props.blok.layout === "left-sidebar" &&
                  <BodyLeftSidebar {...props}/>
                }
              </div>
            </section>
            {(props.blok.belowContent != null && Object.keys(props.blok.belowContent).length > 0) && (
              <section className="ood-interior-page__below-body">
                {props.blok.belowContent && props.blok.belowContent.map((blok) => React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok
                }))}
              </section>
            )}
            {numIconCards > 0 && (
              <footer className="ood-interior-page__body-footer su-bg-fog-light su-py-6">
                <div className={`centered-container flex-container ood-icon-card-section su-align-items-stretch su-flex-${numIconCards}-col`}>
                  {props.blok.iconCards && props.blok.iconCards.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                </div>
              </footer>
            )}
          </article>
        </main>
        <footer>
          {props.blok.localFooter && props.blok.localFooter.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
          {props.blok.globalFooter && props.blok.globalFooter.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
        </footer>
      </SbEditable>
    </>
  )
};

export default OodInteriorPage