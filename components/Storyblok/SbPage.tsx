import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';

type SbPageProps = {
  blok: SbBlokData & {
    body: SbBlokData[];
  }
};

export const SbPage = (props: SbPageProps) => (
  <div {...storyblokEditable(props.blok)}>
    <CreateBloks blokSection={props.blok.body} />
  </div>
);
