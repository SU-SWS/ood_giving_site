import React, { useState, useEffect } from 'react';
import Components from '../components/components.js';
import SbEditable from 'storyblok-react';
import Loader from 'react-loader-spinner';
import { useStaticQuery, graphql } from 'gatsby';
import StoryblokClient from 'storyblok-js-client';

const sbClient = new StoryblokClient({});

/**
 *
 * @param {*} val
 * @returns
 */
const getParam = function (val) {
  var result = '';
  var tmp = [];

  window.location.search
    .substr(1)
    .split('&')
    .forEach(function (item) {
      tmp = item.split('=');
      if (tmp[0] === val) {
        result = decodeURIComponent(tmp[1]);
      }
    });

  return result;
};

/**
 * This is Sparta
 */
const initBridge = function (key, sbResolveRelations, setStory) {
  const { StoryblokBridge } = window

  // Initialize the Storyblok JS Bridge
  const storyblokInstance = new StoryblokBridge({
    resolveRelations: sbResolveRelations,
    accessToken: key,
  });

  // Ping the Visual Editor and enter Editmode manually
  storyblokInstance.pingEditor(function () {
    storyblokInstance.enterEditmode();
  });

  storyblokInstance.on(['change', 'published', 'unpublished'], (event) => {
    window.location.reload();
  });

  // When the content author does stuff.
  storyblokInstance.on('input', (payload) => {
    setStory(payload.story.content);
  });
;

  storyblokInstance.on('enterEditmode', (event) => {
    // loading the draft version on initial view of the page
    sbClient
      .get(`cdn/stories/${getParam('path')}`, {
        version: 'draft',
        resolve_relations: sbResolveRelations || [],
        token: key,
      })
      .then(({ data }) => {
        if (data.story) {
          setStory(data.story.content);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  })
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

      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
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
      <Loader type="Oval" color="#00BFFF" height={125} width={125} />
    </div>
  );
};

export default StoryblokEntry;
