import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { RowOneColumn } from '@/components/Row';

export type SbRowOneColumnProps = {
  blok: SbBlokData & {
    columnContent: SbBlokData[];
  };
}

export const SbRowOneColumn = ({ blok }: SbRowOneColumnProps) => {
  const { columnContent } = blok;

  return (
    <RowOneColumn {...storyblokEditable(blok)}>
      <CreateBloks blokSection={columnContent} />
    </RowOneColumn>
  );
};
