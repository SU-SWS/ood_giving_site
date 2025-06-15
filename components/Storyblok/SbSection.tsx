import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';

// TODO: This is a placeholder
export type SbSectionProps = {
  blok: SbBlokData & {
    title?: string;
    content: SbBlokData[];
  };
}

export const SbSection = (props: SbSectionProps) => {
  return (
    <Container {...storyblokEditable(props.blok)} className="ood-section">
      {props.blok.title && (
        <h2>{props.blok.title}</h2>
      )}
      <CreateBloks blokSection={props.blok.content} />
    </Container>
  );
};
