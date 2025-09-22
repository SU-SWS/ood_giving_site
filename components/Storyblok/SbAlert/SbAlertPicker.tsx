import { CreateStories } from '../../CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbAlertPickerProps = {
  blok: {
    alert?: ISbStoryData[];
  };
};

export const SbAlertPicker = (props: SbAlertPickerProps) => {
  // Only render published alerts
  const publishedAlerts = props?.blok?.alert?.filter((alert) => !!alert.published_at);

  return (
    <CreateStories stories={publishedAlerts} />
  );
};
