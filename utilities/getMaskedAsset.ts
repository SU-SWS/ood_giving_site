import { config } from '@/utilities/config';

/**
 * @param mediaSrc - The Storyblok URL of the asset
 * @returns The processed Storyblok asset URL that is masked by our asset CDN
 */

export const getMaskedAsset = (mediaSrc: string): string => {
  if (!mediaSrc) {
    return '';
  }

  const { imageService } = config;
  const maskedUrl = mediaSrc.replace(imageService, `${config.assetCdn}a-us/`);

  return maskedUrl;
};
