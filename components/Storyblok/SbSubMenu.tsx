import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';

export type SbSubMenuProps = {
  blok: SbBlokData & {
    menuLinkItems?: SbBlokData[];
    ctaLink?: SbBlokData[];
  };
};

export const SbSubMenu = (props: SbSubMenuProps) => (
  <nav
    {...storyblokEditable(props.blok)}
    className="flex gap-[2.4rem] justify-end bg-digital-red-dark [&_a]:no-underline [&_a]:font-normal hocus:[&_a]:underline [&_a]:text-white [&_a]:text-14 [&_a]:leading-[4rem] [&_a]:p-0 [&_.ood-cta_a]:px-18"
    aria-label="Sub Menu"
  >
    <ul className="flex gap-[2.4rem] list-none p-0 m-0 [&>li]:m-0">
      <CreateBloks blokSection={props.blok.menuLinkItems} />
    </ul>
    <CreateBloks blokSection={props.blok.ctaLink} />
  </nav>
);
