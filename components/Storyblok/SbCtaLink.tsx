import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
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

export const SbCtaLink = (props: SbCtaProps) => {
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
      sbLink={link}
      isButton={isButton}
      buttonStyle={linkButtonStyle}
      buttonSize={linkButtonSize || 'default'}
      textColor={linkTextColor}
      icon={linkIcon}
      align={align || 'left'}
      srText={srText}
      rel={rel}
    >
      {linkText}
    </CtaLink>
  );
};
