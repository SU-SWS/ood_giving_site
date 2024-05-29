import React from 'react';

/*
 ** The HtmlHead component is included into the html.js file, to always be loaded.
 */

const HtmlHead = () => {
  // Heap ID
  const ID = '2306378928';
  const isProduction = process.env.CONTEXT === 'production';

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
      <meta
        name="google-site-verification"
        content="tUJ214wF9k79KCsAn5wIOyOFR2eH0RlBANimm5MCFfU"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
        rel="stylesheet"
      />
      {isProduction && (
        <script
          id="heap-id"
          dangerouslySetInnerHTML={{
            __html: `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
            heap.load(${ID});`,
          }}
        />
      )}
    </>
  );
};

export default HtmlHead;
