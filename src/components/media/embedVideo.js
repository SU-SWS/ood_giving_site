import React from "react";
import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";
import Heading from "../partials/heading";

const EmbedVideo = props => {
  let embedUrl = "";
  const videoProvider = props.blok.provider ?? "youtube";
  const startMin = props.blok.startMinute ? props.blok.startMinute : 0;
  const startSec = props.blok.startSecond ? props.blok.startSecond : 0;
  const convertToSecond = (min, sec) => +min * 60 + +sec;

  if (videoProvider === "youtube") {
    embedUrl = `https://www.youtube-nocookie.com/embed/${props.blok.videoId}`;
  } else if (videoProvider === "vimeo") {
    embedUrl = `https://player.vimeo.com/video/${props.blok.videoId}?title=0&byline=0&portrait=0&badge=0`;
  }

  if (videoProvider === "youtube" && (startMin > 0 || startSec > 0)) {
    embedUrl += `?start=${convertToSecond(startMin, startSec)}`;
  }

  return (
    <SbEditable content={props.blok}>
      {props.blok.heading && (
        <Heading
          level={props.blok.headingLevel}
          serif={true}
          weight={"bold"}
          align={"left"}
          classes={`section__title`}
        >
          {props.blok.heading}
        </Heading>
      )}
      <figure className="su-media">
        <div
          className={`su-media__wrapper su-embed-container--${props.blok.aspectRatio}`}
        >
          <iframe
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <figcaption
          className={`su-media__caption ood-story-media__caption su-text-align-${props.blok.captionAlign}`}
        >
          <RichTextField data={props.blok.caption} />
        </figcaption>
      </figure>
    </SbEditable>
  );
};

export default EmbedVideo;
