import { getProcessedImage } from '@/utilities/getProcessedImage';
import * as styles from './Slide.styles';

type SlideProps = React.HTMLAttributes<HTMLDivElement> & {
  imageSrc?: string;
  alt?: string;
}

export const Slide = ({
  imageSrc,
  alt,
  ...props
}: SlideProps) => {
  if (!imageSrc) {
    return null;
  }

  return (
    <div className={styles.root} {...props}>
      <picture>
        <source
          srcSet={getProcessedImage(imageSrc, '0x800')}
          media="(min-width: 1200px)"
        />
        <source
          srcSet={getProcessedImage(imageSrc, '0x500')}
          media="(min-width: 992px)"
        />
        <source
          srcSet={getProcessedImage(imageSrc, '0x410')}
          media="(min-width: 768px)"
        />
        <source
          srcSet={getProcessedImage(imageSrc, '0x340')}
          media="(max-width: 767px)"
        />
        <img
          src={getProcessedImage(imageSrc, '0x800')}
          alt={alt || ''}
          className={styles.image}
        />
      </picture>
    </div>
  );
};
