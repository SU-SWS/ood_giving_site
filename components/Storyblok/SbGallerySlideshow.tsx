import { storyblokEditable } from '@storyblok/react/rsc';
import { GallerySlideshow } from '@/components/GallerySlideshow';
import { type MarginType } from '@/utilities/datasource';
import { type SbGalleryImageType } from '@/components/Storyblok/Storyblok.types';

type SbGallerySlideshowProps = {
  blok: {
    _uid: string;
    slides: SbGalleryImageType[];
    ariaLabel?: string;
    showCounter?: boolean;
    showExpandLink?: boolean;
    spacingTop?: MarginType;
    spacingBottom?: MarginType;
    isHidden?: boolean;
  };
}

export const SbGallerySlideshow = ({
  blok: {
    slides,
    ariaLabel,
    showCounter,
    showExpandLink,
    spacingTop,
    spacingBottom,
    isHidden,
  },
  blok,
}: SbGallerySlideshowProps) => {
  if (isHidden) {
    return null;
  }

  // Sanitize the images array to remove all empty or undefined entries
  // return null if no valid images are present
  const sanitizedImages = slides?.filter(
    (slide) => slide && slide.image && slide.image.filename,
  );

  // If no valid images are present, return null.
  if (!sanitizedImages || sanitizedImages.length === 0) {
    return null;
  }

  return (
    <GallerySlideshow
      {...storyblokEditable(blok)}
      slides={slides}
      ariaLabel={ariaLabel}
      showCounter={showCounter}
      showExpandLink={showExpandLink}
      mt={spacingTop}
      mb={spacingBottom}
    />
  );
};
