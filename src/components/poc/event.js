import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";
import RichTextField from "../richTextField";

// from https://www.npmjs.com/package/rss-parser
let Parser = require('rss-parser');
let parser = new Parser();

const magazineItems = [];
// let feed = [];
(async () => {
  let feed = await parser.parseURL('https://cors-anywhere.herokuapp.com/https://medium.com/feed/@stanfordmag');
  feed.items.forEach(item => {
    magazineItems.push(item);
  });
})();


const Event = (props) => (
  <SbEditable content={props.blok}>
    <div>
      {props.blok.stanfordGlobalHeader && props.blok.stanfordGlobalHeader.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}

      <div className="grad-alumni-banner">
        {/*<img src={node.hero.file.url + '?w=960'} alt={node.heroAltText}></img>*/}
        <img src={ props.blok.hero } alt={ props.blok.heroAltText }></img>
      </div>

      <div className="grad-alumni-day--intro">

        <article className="event-info--wrapper" key={ props.blok.eventTitle }>
          <h1 className="event-title su-type-b ">{ props.blok.eventTitle }</h1>
          <div className="grad-alumni-day--date event-date su-intro-text">Saturday { props.blok.eventStartDate } |
            Stanford University
          </div>
          {/*<p className="su-big-paragraph event-intro--richtext">{ props.blok.eventDescription }</p>*/}
          {/*<RichTextField data={ props.blok.eventDescriptionLong }></RichTextField>*/}
          <p className="su-big-paragraph event-intro--richtext">Rich text field Rich Text Intro will show here later.</p>
          {/*<RichTextField className="su-big-paragraph event-intro--richtext" data={ props.blok.richTextIntro }></RichTextField>*/}
          {/*<div className="su-big-paragraph event-intro--richtext"*/}
          {/*     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(documentToHtmlString(node.intro))}}>*/}
          {/*</div>*/}
          {/*<a className="su-button"*/}
          {/*   href={node.button ? node.button.buttonUrl : "/"}>{node.button ? node.button.buttonText : "Click Here"}</a>*/}
          {props.blok.button && props.blok.button.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
        </article>

        <div className="event-top-card">
          {props.blok.cardTop && props.blok.cardTop.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
        </div>

      </div>

      <div class="Event-Sessions">
        {props.blok.eventSessions && props.blok.eventSessions.map((blok) => React.createElement(Components(blok.component), {key: blok._uid, blok: blok}))}
      </div>

      <section className="event-pricing--wrapper">
        <div className="event-pricing--inner-wrapper text-centered">
          <header>
            <h2 className="event-pricing--heading su-type-b">{ props.blok.pricingSectionHeader }</h2>
          </header>
          <div className="price-items--wrapper">
            {props.blok.eventPricing && props.blok.eventPricing.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
          </div>
        </div>
      </section>

      <section className="bottom-page-section constrained-width">

        < article className="event-video--wrapper text-centered" key="Video Section">

          <div className="watch-video-label su-intro-text text-centered">Watch</div>
          <h3 className="video-title-label su-type-b">{props.blok.videoTitle ? props.blok.videoTitle : ""}</h3>

          <iframe width="460" height="260"
                  src={props.blok.videoPlaybackUrl ? props.blok.videoPlaybackUrl : ""}>
          </iframe>

        </article>

        < article className="event-quote--wrapper" key="Quote Section">
          {props.blok.quotes && props.blok.quotes.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
        </article>

      </section>

      <section class="magazine-section">
        <h2 class="su-type-b">Stanford Magazine</h2>
        {magazineItems.slice(0, 3).map((item, i) =>
          <div class="magazine-item">
            <a href={item.link ? item.link : "./"}
               className="su-link su-type-c">{item.title}</a>
            {/*<p class="su-big-paragraph">{item.pubDate.replace(/\n# $&:\n\t/g, "")}</p>*/}
            <p class="su-big-paragraph">{item.pubDate.replace(/GMT/g, "").replace(/(([0-9])*:[0-9][0-9])/g, "")}</p>
            <div class="magazine-categories">
              {item.categories.map((category, c) =>

                // <span class="category">{category.replace(/-/g, " ")}</span>
                <a href={category ? 'https://medium.com/tag/' + category : "https://medium.com/stanford-magazine"}
                   className="category">{category.replace(/-/g, " ").charAt(0).toUpperCase() + category.replace(/-/g, " ").slice(1)}</a>
              )}
            </div>
          </div>
        )}
      </section>


      {/*  For embed form -    I would lazy load the script url from the embed other field in here */}

      {props.blok.stanfordGlobalFooter && props.blok.stanfordGlobalFooter.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </div>
  </SbEditable>
)

export default Event