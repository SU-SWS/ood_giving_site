import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { RowTwoColumns } from '@/components/Row';
import { type MarginType } from '@/utilities/datasource';

export type SbRowTwoColumnProps = {
  blok: SbBlokData & {
    columnOneContent: SbBlokData[];
    columnTwoContent: SbBlokData[];
    rowWidth?: 'full' | 'flex-xl-10-of-12' | 'flex-lg-10-of-12 flex-xl-8-of-12';
    widthRatio?: '1-to-1' | '1-to-2' | '2-to-1';
    oneColumnMd?: boolean;
    contentAlignment?: 'start' | 'center' | 'end' | 'stretch';
    align?: 'left' | 'right' | 'center';
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
      align={align}
      mb={spacingBottom}
    />
  );
};
