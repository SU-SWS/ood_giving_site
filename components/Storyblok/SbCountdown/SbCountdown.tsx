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

export const SbCountdown = ({ blok }: SbCountdownProps) => (
  <Countdown
    {...storyblokEditable(blok)}
    date={blok.date}
    dayPieRange={blok.dayPieRange}
    hourPieRange={blok.hourPieRange}
    hasDays={blok.hasDays}
  />
);
