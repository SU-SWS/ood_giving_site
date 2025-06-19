import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type SbBlokData } from '@storyblok/react/rsc';
import { type VisibleVerticalType } from '@/components/Image';
import { type SbImageType } from '../Storyblok.types';

/**
 * Common page header props
 */
export type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  blok: SbBlokData & {
    contentMenu: SbBlokData[];
    title?: string;
    intro?: StoryblokRichtext;
    headerSpacingBottom?: string;
    headerBackgroundColor?: string;
    headerLogo?: SbImageType;
    headerImage: SbImageType;
    visibleVertical?: VisibleVerticalType;
  };
};
