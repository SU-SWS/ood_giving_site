'use client';
import ReactPlayer from 'react-player';
import { MediaWrapper, type MediaWrapperProps } from '@/components/Media';
import * as styles from './EmbedVideo.styles';

type EmbedVideoProps = MediaWrapperProps & {
  videoUrl: string;
  startMinute?: string;
  startSecond?: string;
  aspectRatio?: styles.VideoAspectRatioType;
};

export const EmbedVideo = ({
  videoUrl,
  mediaWidth = 'story',
  caption,
  captionAlign,
  startMinute = '0',
  startSecond = '0',
  aspectRatio = '16x9',
  pt,
  pb,
  ...props
}: EmbedVideoProps) => {

  const startTimeInSeconds = Math.max(0,
    (parseInt(startMinute || '0', 10) || 0) * 60 +
    (parseInt(startSecond || '0', 10) || 0),
  );

  console.log('EmbedVideo startTimeInSeconds:', startTimeInSeconds);

  return (
    <MediaWrapper
      width={mediaWidth !== 'fit-parent' ? 'site' : 'full'}
      mediaWidth={mediaWidth || 'story'}
      caption={caption}
      captionAlign={captionAlign}
      pt={pt}
      pb={pb}
      {...props}
    >
      <div className={styles.videoAspectRatios[aspectRatio]}>
        <ReactPlayer
          src={videoUrl}
          width="100%"
          height="100%"
          controls
          playsInline
          config={{
            youtube: {
              start: startTimeInSeconds,
            },
          }}
        />
      </div>
    </MediaWrapper>
  );
};
