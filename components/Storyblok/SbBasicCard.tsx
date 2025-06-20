import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading } from '@/components/Typography';

// TODO: This is a placeholder
export type SbBasicCardProps = {
  blok: SbBlokData & {
    headline?: string;
    ctaLink?: SbBlokData[];
  };
}

export const SbBasicCard = (props: SbBasicCardProps) => {
  return (
    <div {...storyblokEditable(props.blok)} className="bg-sky-dark rs-p-2">
      <Heading size={2} color="white">Basic Card</Heading>
      <CreateBloks blokSection={props.blok.ctaLink} />
    </div>
  );
};
