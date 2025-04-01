import { getMaskedAsset } from '@/utilities/getMaskedAsset';

/**
 *
 * @param imageSrc - The Storyblok URL of the image
 * @param crop - The dimension of the image crop (eg., "600x400")
 * @param focus - The focal point of the image provided by the Storyblok Asset field (eg, "348x414:349x415")
 * @param filters - Additional filters to apply to the image (eg., "blur(10)").
 * To add multiple filters, separate them with a colon, eg., "blur(10):grayscale()"
 * @returns The processed Storyblok image URL that is masked by our asset CDN
 * @see {@link https://www.storyblok.com/docs/image-service} for more info on the Storyblok image service
 *
 * @example
 * getProcessedImage(imageSrc, '900x750', imageFocus, 'blur(10)')
 */

export const getProcessedImage = (
  imageSrc: string = '',
  crop: string = '',
  focus: string = '',
  filters: string = '',
): string => {
  if (!imageSrc) {
    return '';
  // Leave the SVGs alone since they don't need to be processed
  } else if (imageSrc.endsWith('.svg')) {
    return getMaskedAsset(imageSrc);
  }

  // Get the width and the height from the crop dimension
  const width = crop.split('x')[0];
  const height = crop.split('x')[1];

  // Adding '/m' at the end of the URL to automatically convert the image to webp if the browser supports it.
  // Supports jpg, png (including transparent ones). Animated GIFs will retain the GIF format automatically.
  let myParams = '/m';

  // Start off the filters with a default image quality of 70% - works for webp
  let myFilters = '/filters:quality(70)';

  if (crop) {
    myParams += `/${crop}`;
    /**
     * Handle focus only if a crop dimension is provided and it has both width and height
     * If a focal point is provided, add the focal point to the filters.
     * If no focal point is provided, activate the "smart" face detection feature.
     */
    if (width !== '0' && height !== '0') {
      if (focus) {
        myFilters += `:focal(${focus})`;
      } else {
        myParams += '/smart';
      }
    }
  }

  // Add any additional filters
  if (filters) {
    myFilters += `:${filters}`;
  }

  // The URL of the processed Storyblok image
  const processedSbUrl = `${imageSrc}${myParams}${myFilters}`;
  const maskedUrl = getMaskedAsset(processedSbUrl);

  return maskedUrl;
};
