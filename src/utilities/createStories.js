import React from "react"
import Components from "../components/components"

// Create references to stories (entries) in Storyblok
// Useful for rendering global elements, e.g., global footer, menus, that are used on multiple pages

const CreateStories = (props) => {
  if (props.stories) {
    return props.stories.map((story) => {
      // In some cases, stories will initially come through as a UUID if there are too many relationships to resolve at once.
      // This resolves eventually - skip rendering until it does to avoid throwing errors. 
      if (typeof story != 'string') {
        return (
          React.createElement(Components(story.content.component), {
            key: story.content._uid,
            blok: story.content,
            storyLink: story.full_slug,
            ...props
          })
        )
      }
    })
  }

  // Return null if no content provided.
  return null;
};

export default CreateStories
