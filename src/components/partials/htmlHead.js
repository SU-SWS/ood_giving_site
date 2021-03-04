import React from "react"

/*
 ** The HtmlHead component is included into the html.js file, to always be loaded.
 * The purpose of this file is to provide a default Title value,
 * ensure that favicons are provided from Stanford's media source, particularly for browser tab and phone home screens.
 */

const HtmlHead = props => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://www-media.stanford.edu/assets/favicon/apple-touch-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://www-media.stanford.edu/assets/favicon/favicon-196x196.png"
        sizes="196x196"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://www-media.stanford.edu/assets/favicon/favicon-192x192.png"
        sizes="192x192"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://www-media.stanford.edu/assets/favicon/favicon-128.png"
        sizes="128x128"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://www-media.stanford.edu/assets/favicon/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://www-media.stanford.edu/assets/favicon/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://www-media.stanford.edu/assets/favicon/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="mask-icon"
        href="https://www-media.stanford.edu/assets/favicon/safari-pinned-tab.svg"
        color="#ffffff"
      />
      <meta name="application-name" content="Stanford University" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="https://www-media.stanford.edu/assets/favicon/mstile-144x144.png"
      />
      <meta
        name="msapplication-square70x70logo"
        content="https://www-media.stanford.edu/assets/favicon/mstile-70x70.png"
      />
      <meta
        name="msapplication-square150x150logo"
        content="https://www-media.stanford.edu/assets/favicon/mstile-150x150.png"
      />
      <meta
        name="msapplication-square310x310logo"
        content="https://www-media.stanford.edu/assets/favicon/mstile-310x310.png"
      />
      <script
        key="stripe"
        src="https://js.stripe.com/v3"
        type="text/javascript" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
        rel="stylesheet"
      />
    </>
  )
}

export default HtmlHead
