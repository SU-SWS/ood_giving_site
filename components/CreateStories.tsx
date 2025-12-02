import { StoryblokServerComponent, type ISbStoryData } from '@storyblok/react/rsc';
import { logError } from '@/utilities/logger';

/**
 * Use this component with the references (or the multiple/single option) field type
 * when they reference an instance of a story, e.g., the masthead picker in Basic Page.
 * The try/catch was added since we added it on SAA Homesite here as well:
 * https://github.com/SU-SWS/saa_alumni/pull/563
 */

export type CreateStoriesProps = {
  stories: ISbStoryData[];
  [key: string]: unknown;
};

export const CreateStories = ({ stories, ...props }: CreateStoriesProps) => {
  let currentStory: ISbStoryData | undefined;
  if (stories) {
    try {
      return stories.map((story) => {
        currentStory = story;
        return <StoryblokServerComponent key={story.content._uid} blok={story.content} {...props} />;
      });
    } catch (error) {
      const context = currentStory
        ? { storyId: currentStory.id, storyUid: currentStory.content?._uid }
        : { error: 'Story data unavailable' };
      logError('Failed to create story component', error, context);
    }
  }

  // Return null if no content provided.
  return null;
};
