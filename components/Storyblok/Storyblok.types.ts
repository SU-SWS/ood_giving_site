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
      fieldtype: 'multilink';
      id: string;
      url: string;
      cached_url: string;
      target?: '_blank' | '_self';
      anchor?: string;
      rel?: string;
      title?: string;
      prep?: string;
      linktype: 'story';
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: unknown;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: unknown;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: unknown[];
        default_full_slug?: null | string;
        translated_slugs?: null | unknown[];
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      fieldtype: 'multilink';
      id: string;
      url: string;
      cached_url: string;
      target?: '_blank' | '_self';
      linktype: 'url';
      rel?: string;
      title?: string;
      [k: string]: unknown;
    }
  | {
      fieldtype: 'multilink';
      id: string;
      url: string;
      cached_url: string;
      target?: '_blank' | '_self';
      email?: string;
      linktype: 'email';
      [k: string]: unknown;
    }
  | {
      fieldtype: 'multilink';
      id: string;
      url: string;
      cached_url: string;
      target?: '_blank' | '_self';
      linktype: 'asset';
      [k: string]: unknown;
    };
