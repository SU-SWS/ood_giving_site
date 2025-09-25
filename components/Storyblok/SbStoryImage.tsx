import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { StoryImage, type VisibleVerticalType, ImageAspectRatioType } from '@/components/Image';
import { StoryImageWidthType } from '@/components/Media';
import { RichText } from '@/components/RichText';
import { type TextAlignType } from '@/components/Typography';
import { type LightPageBgColorType, type PaddingType } from '@/utilities/datasource';
import { hasRichText } from '@/utilities/hasRichText';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';

type SbStoryImageProps = {
  blok: SbBlokData & {
    image: SbImageType;
    alt?: string;
    aspectRatio?: ImageAspectRatioType;
    imageWidth?: StoryImageWidthType;
    visibleVertical?: VisibleVerticalType;
    caption?: StoryblokRichtext;
    captionAlign?: TextAlignType;
    isCard?: boolean;
    backgroundColor?: LightPageBgColorType;
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  };
};

export const SbStoryImage = ({
  blok: {
    image: { filename, alt, focus } = {},
    aspectRatio,
    caption,
    captionAlign,
    isCard,
    backgroundColor,
    imageWidth,
    visibleVertical,
    spacingTop,
    spacingBottom,
  },
  blok,
}: SbStoryImageProps) => {
  const effectiveAspectRatio = imageWidth === 'su-w-full' ? '10x3' : aspectRatio || 'free';
  const Caption = hasRichText(caption)
    ? <RichText
        textColor="cool-grey"
        wysiwyg={caption}
        // Edge-to-edge images always have center aligned caption
        textAlign={imageWidth !== 'su-w-full' ? captionAlign : 'center'}
      />
    : undefined;

  return (
    <StoryImage
      {...storyblokEditable(blok)}
      imageSrc={filename}
      imageFocus={focus}
      alt={alt}
      aspectRatio={effectiveAspectRatio}
      mediaWidth={imageWidth}
      visibleVertical={visibleVertical}
      caption={Caption}
      captionAlign={captionAlign}
      isCard={isCard}
      backgroundColor={backgroundColor}
      pt={spacingTop}
      pb={spacingBottom}
    />
  );
};
