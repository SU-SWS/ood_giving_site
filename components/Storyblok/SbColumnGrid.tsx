import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { ColumnGrid } from '@/components/Grid';
import { getNumBloks } from '@/utilities/getNumBloks';

type SbColumnGridProps = {
  blok: SbBlokData & {
    columnOneContent: SbBlokData[];
    columnTwoContent: SbBlokData[];
    columnThreeContent?: SbBlokData[];
    oneColumnMd?: boolean;
    isNotStretched?: boolean
  };
};

export const SbColumnGrid = ({ blok }: SbColumnGridProps) => {
  const {
    columnOneContent,
    columnTwoContent,
    columnThreeContent,
    oneColumnMd,
    isNotStretched,
  } = blok;

  if (!getNumBloks(columnOneContent) && !getNumBloks(columnTwoContent) && !getNumBloks(columnThreeContent)) {
    return null;
  }
  const ColOneContent = <CreateBloks blokSection={columnOneContent} />;
  const ColTwoContent = <CreateBloks blokSection={columnTwoContent} />;
  const ColThreeContent = <CreateBloks blokSection={columnThreeContent} />;

  return (
    <ColumnGrid
      {...storyblokEditable(blok)}
      columnOneContent={ColOneContent}
      columnTwoContent={ColTwoContent}
      columnThreeContent={ColThreeContent}
      oneColumnMd={oneColumnMd}
      isNotStretched={isNotStretched}
    />
  );
};
