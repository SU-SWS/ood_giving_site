/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import SbEditable from 'storyblok-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useStaticQuery, graphql } from 'gatsby';
import StoryblokClient from 'storyblok-js-client';
import Components from '../components/components';

const sbClient = new StoryblokClient({});

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
 * This is Sparta
 */
const initBridge = function (key, sbResolveRelations, setStory) {
  const { StoryblokBridge } = window;

  // Initialize the Storyblok JS Bridge
  const storyblokInstance = new StoryblokBridge({
    preventClicks: true,
    resolveRelations: sbResolveRelations,
    accessToken: key,
  });

  // Ping the Visual Editor and enter Editmode manually
  storyblokInstance.pingEditor(() => {
    if (storyblokInstance.isInEditor()) {
      // load the draft version
      storyblokInstance.enterEditmode();
    } else {
      // load the draft version while in new window preview
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
          /* eslint-disable no-console */
          console.log('SBCLIENT STORIES ERR:', error);
        });
    }
  });

  // Listens on multiple events and does a basic website refresh
  storyblokInstance.on(['change', 'published', 'unpublished'], () => {
    window.location.reload();
  });

  // When the content author does stuff.
  storyblokInstance.on('input', (payload) => {
    setStory(payload.story.content);
  });
  storyblokInstance.on('enterEditmode', () => {
    // loading the draft version on initial view of the page
    console.log('SBCLIENT INSTANCE KEY', key);
    sbClient
      .get(`cdn/stories/${getParam('path')}`, {
        version: 'draft',
        resolve_relations: sbResolveRelations || [],
        token: key,
      })
      .then(({ data }) => {
        console.log('SBCLIENT INSTANCE DATA', data);
        if (data.story) {
          setStory(data.story.content);
        }
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.log('SBCLIENT INSTANCE ERR:', error);
      });
  });
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
    const handleAccessToken = async () => {
      try {
        if (!mounted) {
          // Storyblok Preview API access key.
          const key = await getParam('access_key');

          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
          script.onload = () => {
            initBridge(key, sbResolveRelations, setStory);
          };
          document.getElementsByTagName('head')[0].appendChild(script);
        }
        // Ready to go.
        setMounted(true);
      } catch (error) {
        console.error('HANDLE ACCESS TOKEN ERROR:', error);
      }
    };

    handleAccessToken();
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
