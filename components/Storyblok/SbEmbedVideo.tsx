
import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { EmbedVideo, type VideoAspectRatioType } from '@/components/EmbedVideo';
import { VideoWidthType } from '@/components/Media';
import { RichText } from '@/components/RichText';
import { type TextAlignType } from '@/components/Typography';
import { hasRichText } from '@/utilities/hasRichText';
import { type PaddingType } from '@/utilities/datasource';

type SbEmbedVideoProps = {
  blok: SbBlokData & {
    videoUrl?: string;
    caption?: StoryblokRichtext;
    videoWidth?: VideoWidthType;
    aspectRatio?: VideoAspectRatioType;
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
    captionAlign?: TextAlignType;
    startMinute?: string;
    startSecond?: string;
  };
};

export const SbEmbedVideo = ({
  blok: {
    videoUrl,
    caption,
    videoWidth,
    aspectRatio,
    spacingTop,
    spacingBottom,
    captionAlign,
    startMinute,
    startSecond,
  },
  blok,
}: SbEmbedVideoProps) => {
  if (!videoUrl) {
    return null;
  }

  const Caption = hasRichText(caption) ? (
    <RichText
      textColor="cool-grey"
      wysiwyg={caption}
      textAlign={captionAlign}
    />
  ) : undefined;

  return (
    <EmbedVideo
      {...storyblokEditable(blok)}
      videoUrl={videoUrl}
      mediaWidth={videoWidth || 'story'}
      caption={Caption}
      captionAlign={captionAlign}
      aspectRatio={aspectRatio || '16x9'}
      pt={spacingTop}
      pb={spacingBottom}
      startMinute={startMinute}
      startSecond={startSecond}
    />
  );
};
