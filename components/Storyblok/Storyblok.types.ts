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
    cached_url?: string;
    linktype?: string;
    [k: string]: unknown;
  }
  | {
    id?: string;
    cached_url?: string;
    linktype?: 'story';
    [k: string]: unknown;
  }
  | {
    url?: string;
    cached_url?: string;
    linktype?: 'asset' | 'url';
    [k: string]: unknown;
  }
  | {
    email?: string;
    linktype?: 'email';
    [k: string]: unknown;
  };
