import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { Countdown } from '@/components/Countdown';

type SbCountdownProps = {
  blok: SbBlokData & {
    date?: string;
    dayPieRange?: string;
    hourPieRange?: string;
    hasDays?: boolean;
    isDST?: boolean;
  };
};

export const SbCountdown = (props: SbCountdownProps) => (
  <Countdown {...storyblokEditable(props.blok)} />
);
