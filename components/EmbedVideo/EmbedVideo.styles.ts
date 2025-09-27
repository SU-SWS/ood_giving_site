export const videoAspectRatios = {
  '16x9': 'aspect-[16/9]',
  '9x16': 'aspect-[9/16]',
  '4x3': 'aspect-[4/3]',
  '1x1': 'aspect-1',
};
export type VideoAspectRatioType = keyof typeof videoAspectRatios;
