'use client';
import React, { useState, useEffect } from 'react';
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
  const [mounted, setMounted] = useState(false);

  const startTimeInSeconds = Math.max(0,
    (parseInt(startMinute || '0', 10) || 0) * 60 +
    (parseInt(startSecond || '0', 10) || 0),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {mounted && (
          <ReactPlayer
            src={videoUrl}
            width="100%"
            height="100%"
            controls
            playsInline
            config={{
              youtube: {
                start: startTimeInSeconds,
                origin: process.env.URL || 'https://giving.stanford.edu',
                enablejsapi: 1,
              },
            }}
          />
        )}
      </div>
    </MediaWrapper>
  );
};
