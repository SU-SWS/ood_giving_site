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
  LockClosedIcon,
  MapPinIcon,
  MinusIcon,
  PlayCircleIcon,
  PlusIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid';
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
  cursor: CursorArrowRaysIcon,
  close: XMarkIcon,
  email: EnvelopeIcon,
  external: ArrowUpRightIcon,
  flip: ArrowPathIcon,
  left: ArrowLeftIcon,
  link: LinkIcon,
  location: MapPinIcon,
  lock: LockClosedIcon,
  menu: Bars3Icon,
  minus: MinusIcon,
  more: ArrowRightIcon,
  pause: PauseIcon,
  play: PlayIcon,
  'play-outline': PlayCircleIcon,
  plus: PlusIcon,
  right: ArrowRightIcon,
  search: MagnifyingGlassIcon,
  up: ArrowUpIcon,
  video: VideoCameraIcon,
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
  'chevron-right': 'w-09em stroke-[2.5] -mt-01em',
  'chevron-down': 'w-09em -mt-01em',
  close: 'w-1em stroke-[2.5]',
  download: 'w-09em -mt-02em',
  expand: 'w-1em -mt-02em',
  external: 'w-08em stroke-[2.5] -mt-01em',
  left: 'w-08em',
  lock: 'w-09em -mt-03em',
  link: 'w-09em -mt-01em',
  more: 'w-08em',
  plus: 'w-08em',
  right: 'w-08em',
  video: 'w-09em -mt-01em',
};
