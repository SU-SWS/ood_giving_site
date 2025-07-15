import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { RowOneColumn, type RowOneColumnWidthType, type RowOneColumnAlignType } from '@/components/Row';
import { getNumBloks } from '@/utilities/getNumBloks';
import { type PaddingType } from '@/utilities/datasource';

export type SbRowOneColumnProps = {
  blok: SbBlokData & {
    columnContent?: SbBlokData[];
    rowWidth?: RowOneColumnWidthType;
    align?: RowOneColumnAlignType;
    spacingBottom?: PaddingType;
  };
};

export const SbRowOneColumn = ({ blok }: SbRowOneColumnProps) => {
  const {
    columnContent,
    rowWidth,
    align,
    spacingBottom,
  } = blok;

  if (!getNumBloks(columnContent)) return null;

  return (
    <RowOneColumn rowWidth={rowWidth} align={align} pb={spacingBottom} {...storyblokEditable(blok)}>
      <CreateBloks blokSection={columnContent} />
    </RowOneColumn>
  );
};
