import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { StoryImage, type StoryImageWidthType, type VisibleVerticalType } from '@/components/Image';
import { RichText } from '@/components/RichText';
import { type TextAlignType } from '@/components/Typography';
import { type LightPageBgColorsType, type PaddingType } from '@/utilities/datasource';
import { hasRichText } from '@/utilities/hasRichText';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';

type SbStoryImageProps = {
  blok: SbBlokData & {
    _uid: string;
    image: SbImageType;
    alt?: string;
    imageWidth?: StoryImageWidthType;
    visibleVertical?: VisibleVerticalType;
    caption?: StoryblokRichtext;
    captionAlign?: TextAlignType;
    isCard?: boolean;
    backgroundColor?: LightPageBgColorsType;
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
    imageWidth,
    visibleVertical,
    backgroundColor,
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
      imageWidth={imageWidth}
      visibleVertical={visibleVertical}
      alt={alt}
      caption={Caption}
      captionAlign={captionAlign}
      backgroundColor={backgroundColor}
      pt={spacingTop}
      pb={spacingBottom}
    />
  );
};
