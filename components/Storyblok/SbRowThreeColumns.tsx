import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { RowThreeColumns } from '@/components/Row';
import { type MarginType } from '@/utilities/datasource';

export type SbRowThreeColumnProps = {
  blok: SbBlokData & {
    columnOneContent: SbBlokData[];
    columnTwoContent: SbBlokData[];
    columnThreeContent?: SbBlokData[];
    oneColumnMd?: boolean;
    contentAlignment?: 'start' | 'center' | 'end' | 'stretch';
    spacingBottom?: MarginType;
  };
}

export const SbRowThreeColumns = ({ blok }: SbRowThreeColumnProps) => {
  const {
    columnOneContent,
    columnTwoContent,
    columnThreeContent,
    oneColumnMd,
    contentAlignment,
    spacingBottom,
  } = blok;
  const ColOneContent = <CreateBloks blokSection={columnOneContent} />;
  const ColTwoContent = <CreateBloks blokSection={columnTwoContent} />;
  const ColThreeContent = <CreateBloks blokSection={columnThreeContent} />;

  return (
    <RowThreeColumns
      {...storyblokEditable(blok)}
      columnOneContent={ColOneContent}
      columnTwoContent={ColTwoContent}
      columnThreeContent={ColThreeContent}
      oneColumnMd={oneColumnMd}
      contentAlignment={contentAlignment}
      mb={spacingBottom}
    />
  );
};
