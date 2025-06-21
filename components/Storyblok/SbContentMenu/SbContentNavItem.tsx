import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CtaLink } from '@/components/Cta/CtaLink';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';

export type SbContentNavItemProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    linkText?: string;
  };
  slug?: string;
};

export const SbContentNavItem = ({ blok }: SbContentNavItemProps) => {
  const { link, linkText } = blok;

  return (
    <li {...storyblokEditable(blok)} className="mb-0">
      <CtaLink sbLink={link} variant="content-menu">
        {linkText}
      </CtaLink>
    </li>
  );
};
