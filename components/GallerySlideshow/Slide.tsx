'use client';

import { getProcessedImage } from '@/utilities/getProcessedImage';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { RichText } from '@/components/RichText';
import * as styles from './Slide.styles';

type SlideProps = React.HTMLAttributes<HTMLDivElement> & {
  imageSrc?: string;
  alt?: string;
  caption?: StoryblokRichtext;
  isModalSlide?: boolean;
}

export const Slide = ({
  imageSrc,
  alt,
  caption,
  isModalSlide,
  ...props
}: SlideProps) => {
  if (!imageSrc) {
    return null;
  }

  return (
    <>
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
      <RichText
        textColor={isModalSlide ? 'white' : 'black-70'}
        wysiwyg={caption}
        className={isModalSlide ? styles.modalCaption : styles.caption}
      />
    </>
  );
};
