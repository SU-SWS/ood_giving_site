import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CtaLink } from '@/components/Cta/CtaLink';
import { CreateBloks } from '@/components/CreateBloks';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';

/**
 * This component renders a parent link in the content menu that has a nested menu.
 * It can be a top level or 2nd level item.
 */
export type SbContentMenuParentItemProps = {
  blok: SbBlokData & {
    parentItemText?: string;
    parentItemLink?: SbLinkType;
    nestedMenu?: SbBlokData[];
  };
  slug?: string;
};

export const SbContentMenuParentItem = ({ blok }: SbContentMenuParentItemProps) => {
  const { parentItemText, parentItemLink, nestedMenu } = blok;
  return (
    <li className="mb-0" {...storyblokEditable(blok)}>
      <CtaLink sbLink={parentItemLink} variant="content-menu">
        {parentItemText}
      </CtaLink>
      <CreateBloks blokSection={nestedMenu} />
    </li>
  );
};
