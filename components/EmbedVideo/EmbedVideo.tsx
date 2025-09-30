'use client';
import ReactPlayer from 'react-player/lazy';
import { useIsClient } from 'usehooks-ts';
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
  /**
   * This is needed to prevent hydration error for the React Player.
   * https://github.com/cookpete/react-player/issues/1428
   */
  const isClient = useIsClient();

  const startTimeInSeconds = parseInt(startMinute, 10) * 60 + parseInt(startSecond, 10);

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
        {isClient && (
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playsinline
            config={{
              youtube: { playerVars: { start: startTimeInSeconds } },
            }}
          />
        )}
      </div>
    </MediaWrapper>
  );
};
