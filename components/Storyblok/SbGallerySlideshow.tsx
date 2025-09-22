import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { GallerySlideshow, type ContainerWidthType } from '@/components/GallerySlideshow';
import { type MarginType } from '@/utilities/datasource';
import { type SbGalleryImageType } from '@/components/Storyblok/Storyblok.types';

type SbGallerySlideshowProps = {
  blok: SbBlokData & {
    slides: SbGalleryImageType[];
    ariaLabel?: string;
    showCounter?: boolean;
    showExpandLink?: boolean;
    containerWidth?: ContainerWidthType;
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
    containerWidth,
    spacingTop,
    spacingBottom,
    isHidden,
  },
  blok,
}: SbGallerySlideshowProps) => {
  if (isHidden) {
    return null;
  }

  // Sanitize the slides array to remove all empty or undefined entries
  // return null if no valid slides are present
  const sanitizedImages: SbGalleryImageType[] = slides?.filter(
    (slide: SbGalleryImageType) => slide && slide.image && slide.image.filename,
  );

  // If no valid slides are present, return null.
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
      containerWidth={containerWidth}
      mt={spacingTop}
      mb={spacingBottom}
    />
  );
};
