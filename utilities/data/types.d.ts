export type getStoryDataProps = {
  path: string;
};

export type FilterQuery = {
  initiatives?: {
    in_array: string;
  };
  themes?: {
    in_array: string;
  };
};
