import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';

// TODO: This is a placeholder
export type SbBasicCardProps = {
  blok: SbBlokData & {
    headline?: string;
    ctaLink?: SbBlokData[];
  };
}

export const SbBasicCard = (props: SbBasicCardProps) => {
  return (
    <div {...storyblokEditable(props.blok)}>
      <h2>{props.blok.headline}</h2>
      <CreateBloks blokSection={props.blok.ctaLink} />
    </div>
  );
};
