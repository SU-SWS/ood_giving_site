import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type CtaIconType } from '@/components/Cta';
import { type HeadingType } from '@/components/Typography';

/**
 * Generic types for Storyblok fields
 */
export type SbImageType = {
  id?: number,
  alt?: string,
  name?: string,
  focus?: string,
  title?: string,
  filename?: string,
  copyright?: string,
  fieldType?: string,
};

export type SbLinkType =
  | {
      fieldtype?: 'multilink';
      id?: string;
      url?: string;
      cached_url?: string;
      target?: '_blank' | '_self';
      anchor?: string;
      rel?: string;
      title?: string;
      prep?: string;
      linktype: 'story';
      [k: string]: unknown;
    }
  | {
      fieldtype?: 'multilink';
      id?: string;
      url: string;
      cached_url?: string;
      target?: '_blank' | '_self';
      linktype: 'url';
      rel?: string;
      title?: string;
      [k: string]: unknown;
    }
  | {
      fieldtype?: 'multilink';
      id?: string;
      url?: string;
      cached_url?: string;
      target?: '_blank' | '_self';
      email?: string;
      linktype: 'email';
      [k: string]: unknown;
    }
  | {
      fieldtype?: 'multilink';
      id?: string;
      url: string;
      cached_url?: string;
      target?: '_blank' | '_self';
      linktype: 'asset';
      [k: string]: unknown;
    };

// Storyblok plugin Fontawesome Selector
export type SbFontawesomeSelectorType = {
  _uid: string;
  icon?: string;
  type?: 'fas' | 'far'
};

/**
 * Reusable types for custom Storyblok components
 */

export type SbNavItemProps = {
  _uid: string;
  linkTextLabel?: string;
  link?: SbLinkType;
  linkClass?: CtaIconType;
};

export type SbOodMegaMenuNavItemProps = {
  _uid: string;
  linkText?: string;
  link?: SbLinkType;
}

export type SbContentNavItemProps = SbOodMegaMenuNavItemProps;

export type SbAccordionItemsTypes = {
  _uid: string;
  title?: string;
  content?: StoryblokRichtext;
  id?: string;
  defaultOpen?: boolean;
};

// Used for Gallery Slider component
export type SbGalleryImageType = {
  _uid: string;
  image?: SbImageType;
  alt?: string;
  caption?: StoryblokRichtext;
};
