import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';

// TODO: This is a placeholder
export type SbRowOneColumnProps = {
  blok: SbBlokData & {
    columnContent: SbBlokData[];
  };
}

export const SbRowOneColumn = (props: SbRowOneColumnProps) => {
  return (
    <div {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={props.blok.columnContent} />
    </div>
  );
};
