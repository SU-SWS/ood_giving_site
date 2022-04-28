/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useStaticQuery, graphql } from 'gatsby';
import Components from '../components/components';

/**
 *
 * @param {*} val
 * @returns
 */
const getParam = function (val) {
  let result = '';
  let tmp = [];

  window.location.search
    .substr(1)
    .split('&')
    .forEach((item) => {
      tmp = item.split('=');
      if (tmp[0] === val) {
        result = decodeURIComponent(tmp[1]);
      }
    });

  return result;
};

/**
 *
 */
const loadStory = (sbResolveRelations, setStory) => {
  window.storyblok.get(
    {
      slug: window.storyblok.getParam('path'),
      version: 'draft',
      resolve_relations: sbResolveRelations || [],
    },
    (data) => {
      setStory(data.story.content);
    }
  );
};

/**
 * This is Sparta
 */
const initBridge = function (key, sbResolveRelations, setStory) {
  // Initialize the Storyblok JS Bridge
  window.storyblok.init({
    resolveRelations: sbResolveRelations,
    accessToken: key,
  });

  // Ping the Visual Editor and enter Editmode manually
  window.storyblok.pingEditor(() => {
    window.storyblok.enterEditmode();
  });

  // Listens on multiple events and does a basic website refresh
  window.storyblok.on(['change', 'published', 'unpublished'], () => {
    window.location.reload();
  });

  // When the content author does stuff.
  window.storyblok.on('input', (payload) => {
    // Add _editable properties to keep the Storyblok JS Bridge active after the content updates.
    window.storyblok.addComments(payload.story.content, payload.story.id);
    window.storyblok.resolveRelations(payload.story, sbResolveRelations, () => {
      setStory(payload.story.content);
    });
  });

  loadStory(sbResolveRelations, setStory);
};

/**
 * This is another try.
 */
const StoryblokEntry = (props) => {
  const [myStory, setStory] = useState(false);
  const [mounted, setMounted] = useState(false);

  /**
   * Get resolveRelations
   */
  const {
    site: {
      siteMetadata: {
        storyblok: { resolveRelations },
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            storyblok {
              resolveRelations
            }
          }
        }
      }
    `
  );

  const sbResolveRelations = resolveRelations;

  /**
   *
   */
  useEffect(() => {
    // One time load only.
    if (!mounted) {
      // Storyblok Preview API access key.
      const key = getParam('access_key');

      // Must have the API Access key.
      if (key.length === 0 || typeof key !== 'string') {
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//app.storyblok.com/f/storyblok-latest.js';
      script.onload = () => {
        initBridge(key, sbResolveRelations, setStory);
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    setMounted(true);

    // Ready to go.
  }, [sbResolveRelations, mounted, setMounted, myStory]);

  /**
   * Show the content!
   */
  if (myStory && myStory.component) {
    return (
      <SbEditable content={myStory}>
        <div>
          {React.createElement(Components(myStory.component), {
            // eslint-disable-next-line no-underscore-dangle
            key: myStory._uid,
            blok: myStory,
          })}
        </div>
      </SbEditable>
    );
  }

  // Loading...
  return (
    <div className="su-cc">
      <h1>Loading...</h1>
      <ClipLoader color="#00BFFF" height={125} width={125} />
    </div>
  );
};

export default StoryblokEntry;
