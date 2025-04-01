export type getStoryDataProps = {
  path: string;
  isEditor?: boolean;
};

export type FilterQuery = {
  initiatives?: {
    in_array: string;
  };
  themes?: {
    in_array: string;
  };
};
