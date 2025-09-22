import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import {
  RowTwoColumns, type RowTwoColumnAlignType, type RowTwoColumnWidthType, type WidthRatioType,
} from '@/components/Row';
import { type PaddingType } from '@/utilities/datasource';
import { getNumBloks } from '@/utilities/getNumBloks';

export type SbRowTwoColumnProps = {
  blok: SbBlokData & {
    columnOneContent: SbBlokData[];
    columnTwoContent: SbBlokData[];
    rowWidth?: RowTwoColumnWidthType;
    widthRatio?: WidthRatioType;
    oneColumnMd?: boolean;
    contentAlignment?: 'start' | 'center' | 'end' | 'stretch';
    align?: RowTwoColumnAlignType;
    spacingBottom?: PaddingType;
  };
}

export const SbRowTwoColumns = ({ blok }: SbRowTwoColumnProps) => {
  const {
    columnOneContent,
    columnTwoContent,
    rowWidth,
    widthRatio,
    oneColumnMd,
    contentAlignment,
    align,
    spacingBottom,
  } = blok;

  if (!getNumBloks(columnOneContent) && !getNumBloks(columnTwoContent)) return null;

  const ColOneContent = <CreateBloks blokSection={columnOneContent} />;
  const ColTwoContent = <CreateBloks blokSection={columnTwoContent} />;

  return (
    <RowTwoColumns
      {...storyblokEditable(blok)}
      columnOneContent={ColOneContent}
      columnTwoContent={ColTwoContent}
      rowWidth={rowWidth}
      widthRatio={widthRatio}
      oneColumnMd={oneColumnMd}
      contentAlignment={contentAlignment}
      align={align || 'su-mx-auto'}
      pb={spacingBottom}
    />
  );
};
