import {
  ArrowPathIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CursorArrowRaysIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  LinkIcon,
  MapPinIcon,
  MinusIcon,
  PlayCircleIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/16/solid';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';

export const iconMap = {
  action: ChevronRightIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-down': ArrowDownIcon,
  back: ArrowLeftIcon,
  copy: DocumentDuplicateIcon,
  check: CheckIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  download: ArrowDownTrayIcon,
  expand: ArrowsPointingOutIcon,
  'triangle-down': PlayIcon,
  'triangle-right': PlayIcon,
  'triangle-up': PlayIcon,
  cursor: CursorArrowRaysIcon,
  close: XMarkIcon,
  email: EnvelopeIcon,
  external: ArrowUpRightIcon,
  flip: ArrowPathIcon,
  left: ArrowLeftIcon,
  link: LinkIcon,
  location: MapPinIcon,
  menu: Bars3Icon,
  minus: MinusIcon,
  more: ArrowRightIcon,
  pause: PauseIcon,
  play: PlayIcon,
  'play-outline': PlayCircleIcon,
  plus: PlusIcon,
  right: ArrowRightIcon,
  up: ArrowUpIcon,
};
export type IconType = keyof typeof iconMap;

/**
 * Normalized base size and position of each icon (finetuned manually) for use in eg, buttons
 * Only add to this map if different from default class w-1em
 * If you wish to use the HeroIcon without any base styles, set the noBaseStyle boolean prop to true
 */

// This basically means that the keys from iconBaseStyle are from the keys of iconMap
type IconBaseStyleType = Partial<{
  [Key in IconType]: string;
}>;

export const iconBaseStyleDefault = 'w-1em';
export const iconBaseStyle: IconBaseStyleType = {
  'arrow-left': 'w-09em -mt-01em',
  'arrow-right': 'w-09em -mt-01em',
  'chevron-right': 'w-09em -mt-01em',
  'triangle-right': 'w-09em scale-x-90 mt-01em',
  'triangle-down': 'w-09em scale-x-90 rotate-90 mt-01em',
  'triangle-up': 'w-09em scale-x-90 -rotate-90 mt-02em',
  download: 'w-09em',
  expand: 'w-1em -mt-02em',
  external: 'w-08em stroke-[2.5]',
  left: 'w-08em',
  link: 'w-09em -mt-01em',
  more: 'w-08em',
  plus: 'w-08em',
  right: 'w-08em',
};
