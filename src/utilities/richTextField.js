import React from 'react';
import StoryblokClient from 'storyblok-js-client';
import sanitizeHtml from 'sanitize-html';

// Storyblok is now available as variable which contains the richTextResolver functionality
const Storyblok = new StoryblokClient({});

function createMarkup(storyblokHTML) {

  // Run sanitizer and renderer.
  let markup = sanitizeHtml(
    Storyblok.richTextResolver.render(storyblokHTML),
    {
      allowedTags: false, // This allows extra HTML tags to be rendered, e.g., H2, img
      allowedAttributes: false, // This allows custom class names
    }
  )

  // Rewrite the URL to the redirect link to mask the API endpoint.
  markup = markup.replace("http://a.storyblok.com", "/cdn/asset")
  markup = markup.replace("https://a.storyblok.com", "/cdn/asset")

  // Return object for setting inner html.
  return { __html: markup }
}

const RichTextField = ({ data }) => {
  return <div dangerouslySetInnerHTML={createMarkup(data)} />;
};

export default RichTextField
