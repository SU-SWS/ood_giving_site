import * as styles from './MediaWrapper.styles';

/**
 * This is a caption component for images, looping video and embedded video
 * that provides a shared set of layout and options.
 */

export type CaptionProps = React.HTMLAttributes<HTMLDivElement> & {
  caption?: React.ReactNode;
};

export const Caption = ({
  caption,
  className,
  ...props
}: CaptionProps) => {
  return (
    <figcaption {...props} className={styles.caption} data-component="Caption">
      {caption}
    </figcaption>
  );
};
