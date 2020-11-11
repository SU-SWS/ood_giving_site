import React from "react"
import Components from "../components/components"

// Create references to stories (entries) in Storyblok
// Useful for rendering global elements, e.g., global footer, menus, that are used on multiple pages

const CreateStories = (props) => {
  if (props.stories) {
    return (
      props.stories.map((story) => React.createElement(Components(story.content.component), {
        key: story.content._uid,
        blok: story.content,
      }))
    )
  }

  // Return null if no content provided.
  return null;
};

export default CreateStories
