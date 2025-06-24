import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type VisibleVerticalType } from '@/components/Image';
import { type SbImageType } from '../Storyblok.types';
import { type DarkBgColorsType } from '@/utilities/datasource';

/**
 * Common page header props
 */
export type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  intro?: StoryblokRichtext;
  headerBackgroundColor?: DarkBgColorsType;
  headerLogo?: SbImageType;
  headerImage?: SbImageType;
  visibleVertical?: VisibleVerticalType;
};
