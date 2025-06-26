import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import {
  RowTwoColumns, type RowAlignType, type RowWidthType, type WidthRatioType,
} from '@/components/Row';
import { type MarginType } from '@/utilities/datasource';

export type SbRowTwoColumnProps = {
  blok: SbBlokData & {
    columnOneContent: SbBlokData[];
    columnTwoContent: SbBlokData[];
    rowWidth?: RowWidthType;
    widthRatio?: WidthRatioType;
    oneColumnMd?: boolean;
    contentAlignment?: 'start' | 'center' | 'end' | 'stretch';
    align?: RowAlignType;
    spacingBottom?: MarginType;
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
      mb={spacingBottom}
    />
  );
};
