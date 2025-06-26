import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { RowOneColumn } from '@/components/Row';
import { getNumBloks } from '@/utilities/getNumBloks';

export type SbRowOneColumnProps = {
  blok: SbBlokData & {
    columnContent: SbBlokData[];
  };
}

export const SbRowOneColumn = ({ blok }: SbRowOneColumnProps) => {
  const { columnContent } = blok;

  if (!getNumBloks(columnContent)) return null;

  return (
    <RowOneColumn {...storyblokEditable(blok)}>
      <CreateBloks blokSection={columnContent} />
    </RowOneColumn>
  );
};
