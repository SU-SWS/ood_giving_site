export type getStoryDataProps = {
  path: string;
  isEditor?: boolean;
};

export type PageProps = {
  searchParams: {
    accessToken: string,
    path: string,
    _storyblok: string, // ID of space (eg: 1005200)
    _storyblok_c: string,
    _storyblok_version: string,
    _storyblok_lang: string,
    _storyblok_release: string, // number as a string eg: '0'
    _storyblok_rl: string, // eg: '1698435696245'
    '_storyblok_tk[space_id]': string, // eg: '1005200'
    '_storyblok_tk[timestamp]': string, // eg: '1698435695'
    '_storyblok_tk[token]': string // eg: '654efea80d36a0b2bas3640ea937b0e0d4cc0234'
  };
};

export type FilterQuery = {
  initiatives?: {
    in_array: string;
  };
  themes?: {
    in_array: string;
  };
};
