'use client';

import { type SbAlertIconType, type SbAlertBgColorType, SbAlertBgColors } from '@/components/Storyblok/SbAlert/SbAlert';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { FAIcon } from '@/components/FAIcon';
import { CtaButton, CtaLink } from '@/components/Cta';
import { cnb } from 'cnbuilder';
import { useMemo, useState } from 'react';
import { FlexBox } from '@/components/FlexBox';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { hasRichText } from '@/utilities/hasRichText';
import { RichText } from '@/components/RichText';
import { HeroIcon } from '../HeroIcon';

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

const textColorsForBg: Record<SbAlertBgColorType, string> = {
  'blue': 'text-white',
  'green': 'text-white',
  'red': 'text-white',
  'light-grey': 'text-black',
  'yellow': 'text-black',
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
          textColor={textColorsForBg[bg] === 'text-white' ? 'white' : 'black'}
        />
      : null
  ), [bodyText, bg]);

  if (dismissed) {
    return null;
  }

  return (
    <div className={cnb(SbAlertBgColors[bg], {
      'text-white': textColorsForBg[bg] === 'text-white',
      'text-black': textColorsForBg[bg] === 'text-black',
    })}>
      <FlexBox className="cc gap-x-26 gap-y-16 lg:gap-y-18 xl:gap-y-19 rs-py-0 flex-col lg:flex-row items-start lg:items-center">
        <FlexBox alignItems="center" className="flex-grow-0 gap-x-8">
          <FAIcon icon={icon} iconStyle={icon === 'bell' ? 'far' : 'fas'} aria-hidden />
          <span className="uppercase text-18 tracking-widest font-semibold">{label}:</span>
        </FlexBox>
        <FlexBox className="flex-1 gap-x-26 gap-y-16 lg:gap-y-18 xl:gap-y-19 flex-col sm:flex-row items-end sm:items-center">
          <div className="flex-1">
            <div className={cnb({
              '[&_a]:!text-white': textColorsForBg[bg] === 'text-white',
              '[&_a]:!text-black': textColorsForBg[bg] === 'text-black',
            })}>
              {content}
            </div>
            {!!cta && !!ctaText && (
              <div className="rs-mt-0">
                <CtaLink
                  sbLink={cta}
                  variant="inline"
                  icon="su-link--action"
                  className={cnb({
                  'text-white hocus:text-white': textColorsForBg[bg] === 'text-white',
                  'text-black hocus:text-black': textColorsForBg[bg] === 'text-black',
                })}>
                  {ctaText}
                </CtaLink>
              </div>
            )}
          </div>
          {hasDismiss && (
            <CtaButton
              className={cnb(
                'flex items-center gap-8 flex-grow-0 uppercase tracking-widest font-semibold !text-18',
                {
                  'text-white hocus:text-white': textColorsForBg[bg] === 'text-white',
                  '!text-black hocus:!text-black': textColorsForBg[bg] === 'text-black',
                },
              )}
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
