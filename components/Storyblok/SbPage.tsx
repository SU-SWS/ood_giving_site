import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';

type SbPageProps = {
  blok: SbBlokData & {
    body: SbBlokData[];
  }
};

// TODO DS-1417: Remove and clean this up after a quick check of SB
export const SbPage = (props: SbPageProps) => (
  <div {...storyblokEditable(props.blok)}>
    <CreateBloks blokSection={props.blok.body} />
  </div>
);
