'use client';

import { type SbAlertIconType, type SbAlertBgColorType } from '@/components/Storyblok/SbAlert/SbAlert';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { FAIcon } from '@/components/FAIcon';
import { CtaButton, CtaLink } from '@/components/Cta';
import { useMemo, useState } from 'react';
import { FlexBox } from '@/components/FlexBox';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { hasRichText } from '@/utilities/hasRichText';
import { RichText } from '@/components/RichText';
import { HeroIcon } from '../HeroIcon';
import { alertBgTextColors } from './Alert.styles';
import * as styles from './Alert.styles';

export type AlertProps = {
  bg?: SbAlertBgColorType;
  icon?: SbAlertIconType;
  label?: string;
  ctaText?: string;
  cta?: SbLinkType;
  bodyText?: StoryblokRichtext;
  hasDismiss?: boolean;
  onDismiss?: () => void;
};

export const Alert = ({
  bg = 'yellow',
  icon = 'exclamation-triangle',
  label,
  ctaText,
  cta,
  bodyText,
  hasDismiss = true,
  onDismiss,
}: AlertProps) => {
  const [dismissed, setDismissed] = useState(false);

  const content = useMemo(() => (
    hasRichText(bodyText)
      ? <RichText
          wysiwyg={bodyText}
          textColor={alertBgTextColors[bg] === 'text-white' ? 'white' : 'black'}
        />
      : null
  ), [bodyText, bg]);

  if (dismissed) {
    return null;
  }

  return (
    <div className={styles.alert(bg)}>
      <FlexBox className={styles.alertContainer}>
        <FlexBox alignItems="center" className={styles.alertHeader}>
          <FAIcon icon={icon} iconStyle={icon === 'bell' ? 'far' : 'fas'} aria-hidden />
          <span className={styles.alertLabel}>{label}:</span>
        </FlexBox>
        <FlexBox className={styles.alertMain}>
          <div className={styles.alertContentWrapper}>
            <div className={styles.alertContent(bg)}>
              {content}
            </div>
            {!!cta && !!ctaText && (
              <div className={styles.alertCtaWrapper}>
                <CtaLink
                  sbLink={cta}
                  variant="inline"
                  icon="su-link--action"
                  className={styles.alertCta(bg)}>
                  {ctaText}
                </CtaLink>
              </div>
            )}
          </div>
          {hasDismiss && (
            <CtaButton
              className={styles.alertDismissButton(bg)}
              onClick={onDismiss ? onDismiss : () => setDismissed(true)}
            >
              Dismiss <HeroIcon icon="close-circle" />
            </CtaButton>
          )}
        </FlexBox>
      </FlexBox>
    </div>
  );
};
