import { type CtaIconType } from '@/components/Cta';
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
