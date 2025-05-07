import React from 'react';
import StoryblokClient, { type ISbRichtext } from 'storyblok-js-client';
import sanitizeHtml from 'sanitize-html';
import { config } from '@/utilities/config';

// Storyblok is now available as variable which contains the richTextResolver functionality
const Storyblok = new StoryblokClient({});

function createMarkup(storyblokHTML: ISbRichtext) {
  // Run sanitizer and renderer.
  let markup = sanitizeHtml(Storyblok.richTextResolver.render(storyblokHTML), {
    allowedTags: false, // This allows extra HTML tags to be rendered, e.g., H2, img
    allowedAttributes: false, // This allows custom class names
    allowVulnerableTags: true, // https://github.com/apostrophecms/sanitize-html/blob/main/CHANGELOG.md#1250
  });

  // Rewrite the URL to the redirect link to mask the API endpoint.
  if (config.isNetlify) {
    markup = markup.replace(
      /http?(s)\:\/\/a\.storyblok\.com/gi,
      config.assetCdn + 'a',
    );
    markup = markup.replace(
      /http?(s)\:\/\/img?[0-9]\.storyblok\.com/gi,
      config.assetCdn + 'i',
    );
  }

  // Return object for setting inner html.
  return { __html: markup };
}

export const RichTextField = ({ data }: { data: ISbRichtext }) => {
  return <div dangerouslySetInnerHTML={createMarkup(data)} />;
};
