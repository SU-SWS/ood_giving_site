import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';
import { type PaddingType } from '@/utilities/datasource';

// TODO: This is a placeholder
export type SbSectionProps = {
  blok: SbBlokData & {
    title?: string;
    content: SbBlokData[];
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  };
}

export const SbSection = (props: SbSectionProps) => {
  return (
    <Container pt={props.blok.spacingTop} pb={props.blok.spacingBottom} {...storyblokEditable(props.blok)}>
      {props.blok.title && (
        <h2>{props.blok.title}</h2>
      )}
      <CreateBloks blokSection={props.blok.content} />
    </Container>
  );
};
