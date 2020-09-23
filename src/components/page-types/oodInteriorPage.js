import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import Components from "../components"
import HeaderMinimal from '../partials/headerMinimal'
import HeaderNoImage from '../partials/headerNoImage'
import HeaderWithImage from '../partials/headerWithImage'
import BodyLeftSidebar from '../partials/bodyLeftSidebar'
import BodyNoSidebar from '../partials/bodyNoSidebar'
import IconCardSection from '../partials/iconCardSection'
import Footer from '../partials/footer'
import { Helmet } from 'react-helmet'

const OodInteriorPage = (props) => {
  return (
    <>
      <SbEditable content={props.blok}>
        <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
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
            {(props.blok.aboveContent != null && Object.keys(props.blok.aboveContent).length > 0) && (
              <section className="ood-interior-page__above-body">
                {props.blok.aboveContent && props.blok.aboveContent.map((blok) => React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok
                }))}
              </section>
            )}
            {(props.blok.bodyTitle || (props.blok.pageContent != null && Object.keys(props.blok.pageContent).length > 0)) && (
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
            )}
            {(props.blok.belowContent != null && Object.keys(props.blok.belowContent).length > 0) && (
              <section className="ood-interior-page__below-body">
                {props.blok.belowContent && props.blok.belowContent.map((blok) => React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok
                }))}
              </section>
            )}
            <footer className="ood-interior-page__main-footer">
              <IconCardSection {...props}/>
            </footer>
          </article>
        </main>
        <Footer {...props}/>
      </SbEditable>
    </>
  )
};

export default OodInteriorPage