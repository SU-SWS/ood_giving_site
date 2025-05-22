import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { StoryImage } from '@/components/Image';
import { RichText } from '@/components/RichText';
import { type TextAlignType } from '@/components/Typography';
import { type ImageAspectRatioType, type PaddingType } from '@/utilities/datasource';
import { hasRichText } from '@/utilities/hasRichText';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';

type SbStoryImageProps = {
  blok: SbBlokData & {
    _uid: string;
    image: SbImageType;
    alt?: string;
    caption?: StoryblokRichtext;
    captionAlign?: TextAlignType;
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  };
};

export const SbStoryImage = ({
  blok: {
    image: { filename, alt, focus } = {},
    caption,
    captionAlign,
    isCard,
    spacingTop,
    spacingBottom,
  },
  blok,
}: SbStoryImageProps) => {
  const Caption = hasRichText(caption) ? <RichText textColor="black-70" wysiwyg={caption} /> : undefined;

  return (
    <StoryImage
      {...storyblokEditable(blok)}
      imageSrc={filename}
      imageFocus={focus}
      alt={alt}
      caption={Caption}
      aspectRatio="free"
      pt={spacingTop}
      pb={spacingBottom}
    />
  );
};
