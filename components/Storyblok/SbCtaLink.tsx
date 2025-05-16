import React from 'react';
import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { type SbLinkType } from './Storyblok.types';
import {
  ctaLinkColors,
  ctaLinkStyles,
  ctaSizes,
  type CtaLinkStylesType, 
  type CtaLinkColorsType,
  type CtaSizesType,
  type LinkIconsType,
} from '@/utilities/datasource';
import { dcnb } from 'cnbuilder';

export type SbCtaProps = {
  blok: SbBlokData & {
    align?: string;
    link: SbLinkType;
    linkText?: string;
    isButton?: boolean;
    linkButtonStyle?: CtaLinkStylesType;
    linkButtonSize?: CtaSizesType;
    linkIcon?: LinkIconsType;
    linkTextColor?: CtaLinkColorsType;
    rel?: string;
    srText?: string;
  }
};

export const SbCtaLink = React.forwardRef<HTMLAnchorElement, SbCtaProps>((props, ref) => {
  if (!props.blok.linkText) {
    return null;
  }

  return (
    <div {...storyblokEditable(props.blok)} className={`ood-cta block su-text-align-${props.blok.align}`}>
      <SbLink
        ref={ref}
        link={props.blok.link}
        classes={dcnb(props.blok.linkIcon,
          'text-18 md:text-20',
          {
            [
              `text-digital-red hocus:text-sky-dark hocus:underline
              ${ctaLinkColors[props.blok.linkTextColor]}`
            ]: !props.blok.isButton,
            [
              `pt-11 px-30 pb-12 font-sans
              inline-block w-auto border-none font-regular
              no-underline transition-colors hocus:underline
              ${ctaLinkStyles?.[props.blok.linkButtonStyle]}
              ${ctaSizes?.[props.blok.linkButtonSize]}`
            ]: props.blok.isButton,
          },
        )}
        attributes={props.blok.rel ? {rel: props.blok.rel} : {}}
      >
        {props.blok.linkText}
        {props.blok.srText && (
          <span className="sr-only">{` ${props.blok.srText}`}</span>
        )}
      </SbLink>
    </div>
  );
});
