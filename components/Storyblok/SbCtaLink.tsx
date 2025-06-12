import React from 'react';
import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import {
  CtaLink,
  type CtaAlignType,
  type CtaButtonStyleType,
  type CtaButtonSizeType,
  type CtaTextColorType,
  type CtaIconType,
} from '@/components/Cta';
import { type SbLinkType } from './Storyblok.types';

export type SbCtaProps = {
  blok: SbBlokData & {
    align?: CtaAlignType;
    link: SbLinkType;
    linkText?: string;
    isButton?: boolean;
    linkButtonStyle?: CtaButtonStyleType;
    linkButtonSize?: CtaButtonSizeType;
    linkTextColor?: CtaTextColorType;
    linkIcon?: CtaIconType;
    rel?: string;
    srText?: string;
  }
};

export const SbCtaLink = React.forwardRef<HTMLAnchorElement, SbCtaProps>((props, ref) => {
  const {
    linkText,
    link,
    isButton,
    rel,
    srText,
    align,
    linkButtonStyle,
    linkButtonSize,
    linkIcon,
    linkTextColor,
  } = props.blok;

  if (!props.blok.linkText) {
    return null;
  }

  return (
    <CtaLink
      {...storyblokEditable(props.blok)}
      ref={ref}
      sbLink={link}
      isButton={isButton}
      buttonStyle={linkButtonStyle}
      buttonSize={linkButtonSize}
      textColor={linkTextColor}
      // icon={linkIcon}
      align={align}
      srText={srText}
      rel={rel}
    >
      {linkText}
    </CtaLink>
  );
});
