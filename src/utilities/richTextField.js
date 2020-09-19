import React from 'react';
import StoryblokClient from 'storyblok-js-client';
import sanitizeHtml from 'sanitize-html';

// Storyblok is now available as variable which contains the richTextResolver functionality
const Storyblok = new StoryblokClient({});

function createMarkup(storyblokHTML) {
  return {
    __html: sanitizeHtml(Storyblok.richTextResolver.render(storyblokHTML),
      {
        allowedTags: false, // This allows extra HTML tags to be rendered, e.g., H2, img
        allowedAttributes: false, // This allows custom class names
      }
    ),
  };
}

const RichTextField = ({ data }) => {
  return <div dangerouslySetInnerHTML={createMarkup(data)} />;
};

export default RichTextField