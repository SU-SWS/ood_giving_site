import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Grid } from '@/components/Grid';
import { getNumBloks } from '@/utilities/getNumBloks';

type SbGridThreeColumnsProps = {
  blok: SbBlokData & {
    gridContent: SbBlokData[];
  };
};

export const SbGridThreeColumns = ({ blok }: SbGridThreeColumnsProps) => {
  const { gridContent } = blok;
  if (!getNumBloks(gridContent)) return null;

  return (
    <Grid
      {...storyblokEditable(blok)}
      gap="card"
      sm={2}
      lg={3}
    >
      <CreateBloks blokSection={gridContent} />
    </Grid>
  );
};
