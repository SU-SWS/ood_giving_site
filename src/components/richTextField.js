import React from 'react';
import StoryblokClient from 'storyblok-js-client';
import sanitizeHtml from 'sanitize-html';
// Storyblok is now available as variable which contains the richTextResolver functionality
const Storyblok = new StoryblokClient({});

function createMarkup(storyblokHTML) {
  return {
    __html: sanitizeHtml(Storyblok.richTextResolver.render(storyblokHTML)),
  };
}
// __html: DOMPurify.sanitize(Storyblok.richTextResolver.render(storyblokHTML)),

// basically defines a component
// uses the functionality from storyblok js client

const RichTextField = ({ data }) => {
  return <div dangerouslySetInnerHTML={createMarkup(data)} />;
};

export default RichTextField;
