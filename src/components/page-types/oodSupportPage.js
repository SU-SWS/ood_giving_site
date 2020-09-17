import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components"
import HeaderNoImage from '../partials/headerNoImage'
import { Helmet } from 'react-helmet'

const OodSupportPage = (props) => {
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
              className="ood-interior-page--no-image ood-support-page"
        >
          <article className={`su-bg-fog-light`}>
            <HeaderNoImage {...props}/>
            <section className="ood-interior-page__body ood-support-page__body">
              {props.blok.bodyTitle &&
                <header className="centered-container ood-interior-page__body-header su-text-align-center">
                  <h2 className="ood-interior-page__body-header-title su-serif">{props.blok.bodyTitle}</h2>
                </header>
              }
              <div class="centered-container ood-support-page__filter-container">
                <input type="radio" id="athletics" name="area"/>
                <label htmlFor="athletics">Athletics</label>
                <input type="radio" id="undergraduate" name="area"/>
                <label htmlFor="undergraduate">Undergraduate Education</label>
                <input type="radio" id="grad" name="area"/>
                <label htmlFor="grad">Graduate Education</label>
                <input type="radio" id="arts" name="area"/>
                <label htmlFor="arts">Arts</label>
                <div className={`grid-3-column su-my-7`}>
                  {props.blok.undergraduate && props.blok.undergraduate.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.graduate && props.blok.graduate.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.arts && props.blok.arts.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.athletics && props.blok.athletics.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                </div>
              </div>
            </section>
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
        {props.blok.iconCardSection && props.blok.iconCardSection.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        {props.blok.localFooter && props.blok.localFooter.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        {props.blok.globalFooter && props.blok.globalFooter.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </SbEditable>
    </>
  )
}

export default OodSupportPage