import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';

export type FooterProps = {
  localFooter: SbBlokData[];
  globalFooter: SbBlokData[];
}

/*
 * The footer component is referenced and used in all page-type components.
 * It incorporates the local footer and global footer, based on page settings.
 */
export const Footer = ({ localFooter, globalFooter }: FooterProps) => (
  <footer>
    <CreateBloks blokSection={localFooter} />
    <CreateBloks blokSection={globalFooter} />
  </footer>
);
