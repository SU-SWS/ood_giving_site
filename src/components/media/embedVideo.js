import React from "react";
import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";
import CenteredContainer from "../partials/centeredContainer";
import FlexCell from "../partials/flexCell";

// Wrapper that sets the size of the video depending on Storyblok option selected
const VideoWrapper = (props) => {
  const videoWrapperClasses = `video-embed
        ${
          props.blok.spacingTop !== "none"
            ? `su-pt-${props.blok.spacingTop}`
            : ""
        }
        ${
          props.blok.spacingBottom !== "none"
            ? `su-pb-${props.blok.spacingBottom}`
            : ""
        }`;

  if (props.blok.videoWidth === "site") {
    return (
      <CenteredContainer classes={videoWrapperClasses}>
        {props.children}
      </CenteredContainer>
    );
  } else if (props.blok.videoWidth === "story") {
    return (
      <CenteredContainer flex={true} classes={videoWrapperClasses}>
        <FlexCell lg={8} classes={"su-mx-auto"}>
          {props.children}
        </FlexCell>
      </CenteredContainer>
    );
  } else if (props.blok.videoWidth === "inset") {
    return (
      <CenteredContainer flex={true} classes={videoWrapperClasses}>
        <FlexCell sm={10} md={8} lg={7} xl={6} classes={"su-mx-auto"}>
          {props.children}
        </FlexCell>
      </CenteredContainer>
    );
  } else {
    // This is for fitting to any parent container width so we don't want centered container
    return <div className={videoWrapperClasses}>{props.children}</div>;
  }
};

const EmbedVideo = (props) => {
  /*  let embedUrl = "";
  const videoProvider = props.blok.provider ?? "youtube";
  const startMin = props.blok.startMinute
    ? parseInt(props.blok.startMinute)
    : 0;
  const startSec = props.blok.startSecond
    ? parseInt(props.blok.startSecond)
    : 0;

  const convertToSecond = (min, sec) => min * 60 + sec;

  if (videoProvider === "youtube") {
    embedUrl = `https://www.youtube-nocookie.com/embed/${props.blok.videoId}`;
  } else if (videoProvider === "vimeo") {
    embedUrl = `https://player.vimeo.com/video/${props.blok.videoId}?title=0&byline=0&portrait=0&badge=0`;
  }

  // Youtube only option with a start time
  if (videoProvider === "youtube" && (startMin > 0 || startSec > 0)) {
    embedUrl += `?start=${convertToSecond(startMin, startSec)}`;
  }*/

  async function getVid() {
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${props.blok.videoId}&format=json`
      );
      const json = await res.json();
      console.log("json", json);
      return json;
    } catch (err) {
      console.error("err", err);
    }
  }

  return (
    <SbEditable content={props.blok}>
      <h2>{getVid().title}</h2>
      <VideoWrapper {...props}>
        <figure className="su-media">
          <div
            className={`su-media__wrapper su-embed-container--${props.blok.aspectRatio}`}
          ></div>
          {props.blok.caption && (
            <figcaption
              className={`su-media__caption ood-story-media__caption su-text-align-${props.blok.captionAlign}`}
            >
              <RichTextField data={props.blok.caption} />
            </figcaption>
          )}
        </figure>
      </VideoWrapper>
    </SbEditable>
  );
};

export default EmbedVideo;
