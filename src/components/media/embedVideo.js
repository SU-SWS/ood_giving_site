import React from "react";
import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";
import Heading from "../partials/heading";

const EmbedVideo = props => {
  let embedUrl = "";
  const videoProvider = props.blok.provider ?? "youtube";

  embedUrl = `https://www.youtube-nocookie.com/embed/${props.blok.videoId}`;

  if (videoProvider === "youtube") {
    embedUrl = `https://www.youtube-nocookie.com/embed/${props.blok.videoId}`;
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
          className={`su-media__wrapper su-embed-container su-aspect-ratio--${props.blok.aspectRatio}`}
        >
          <iframe
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
