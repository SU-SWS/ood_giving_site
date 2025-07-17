import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type SbLinkType } from '../Storyblok.types';
import { Alert } from '@/components/Alert';

export const SbAlertBgColors = {
  'light-grey': 'bg-foggy-light',
  'yellow': 'bg-illuminating-dark',
  'blue': 'bg-digital-blue-dark',
  'green': 'bg-digital-green',
  'red': 'bg-digital-red',
};
export type SbAlertBgColorType = keyof typeof SbAlertBgColors;

export type SbAlertIconType = 'bell' | 'info-circle' | 'ban' | 'exclamation-triangle' | 'check-circle';

export type SbAlertProps = {
  blok: SbBlokData & {
    backgroundColor?: SbAlertBgColorType;
    fontAwesomeIcon?: SbAlertIconType;
    label?: string;
    alertBodyText?: StoryblokRichtext;
    ctaText?: string;
    cta?: SbLinkType;
  };
};

export const SbAlert = ({ blok }: SbAlertProps) => (
  <Alert
    {...storyblokEditable(blok)}
    bg={blok.backgroundColor}
    icon={blok.fontAwesomeIcon}
    label={blok.label}
    ctaText={blok.ctaText}
    cta={blok.cta}
    bodyText={blok.alertBodyText}
  />
);
