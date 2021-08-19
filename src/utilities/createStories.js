import React from "react";
import Components from "../components/components";

// Create references to stories (entries) in Storyblok
// Useful for rendering global elements, e.g., global footer, menus, that are used on multiple pages

const CreateStories = (props) => {
  if (props.stories) {
    return props.stories.map((story) => {
      // In some cases, stories will initially come through as a UUID if there are too many relationships to resolve at once.
      // This resolves eventually - skip rendering until it does to avoid throwing errors.
      if (typeof story !== "string") {
        return React.createElement(Components(story.content.component), {
          key: story.content._uid,
          blok: story.content,
          storyLink: story.full_slug,
          ...props,
        });
      }

      if (
        window.location.pathname == "/editor/" &&
        !document.cookie.match(/maxRelationsWarning/)
      ) {
        alert(
          "This page has exceeded Storyblok's max number of relations per request," +
            "so some items may not be shown in the Preview. These items will " +
            "still be shown on the published version of the page."
        );
        // Set cookie so we don't show the warning again in the same session.
        document.cookie = "maxRelationsWarning=1; SameSite=None; Secure";
      }
    });
  }

  // Return null if no content provided.
  return null;
};

export default CreateStories;
