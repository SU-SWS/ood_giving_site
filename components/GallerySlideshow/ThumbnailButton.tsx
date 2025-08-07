import { isSbImagePortrait } from '@/utilities/isSbImagePortrait';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { type SbGalleryImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './GallerySlideshow.styles';

type ThumbnailButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  slide: SbGalleryImageType;
  isActive: boolean;
  ariaLabel: string;
};

export const ThumbnailButton = ({
  slide,
  isActive,
  ariaLabel,
  ...props
}: ThumbnailButtonProps) => {
  const isPortrait = isSbImagePortrait(slide?.image.filename);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={isActive ? 'true' : undefined}
      className={styles.thumbButton(isActive, isPortrait)}
      {...props}
    >
      <img
        src={getProcessedImage(
          slide?.image.filename,
          isPortrait ? '65x0' : '100x0',
        )}
        alt=""
      />
    </button>
  );
};
