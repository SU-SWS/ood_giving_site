import { type SbBlokData } from '@storyblok/react/rsc';
/**
 * Returns the number of nested bloks when we use the CreateBloks utility.
 *
 * @param sbField - The Storyblok field to count bloks in.
 * @returns The number of bloks added to this Storyblok field.
 */

export const getNumBloks = (sbField: SbBlokData[]) => {
  if (sbField?.length) {
    return sbField.length;
  }

  return 0;
};
