import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { cnb } from 'cnbuilder';
import { CreateBloks } from '@/components/CreateBloks';
import { Grid, type GridNumColsType } from '@/components/Grid';
import { getNumBloks } from '@/utilities/getNumBloks';

type SbCuratedStoriesProps = {
  blok: SbBlokData & {
    featuredStories: SbBlokData[];
    otherStories: SbBlokData[];
    ctaLink?: SbBlokData[];
    layout?: GridNumColsType;
  };
};

export const SbCuratedStories = ({ blok }: SbCuratedStoriesProps) => {
  const {
    featuredStories,
    otherStories,
    ctaLink,
    layout = 3,
  } = blok;

  return (
    <div {...storyblokEditable(blok)}>
      {!!getNumBloks(featuredStories) && (
        <div className="xl:w-10/12 mx-auto rs-mb-3">
          <CreateBloks blokSection={featuredStories} />
        </div>
      )}
      {!!getNumBloks(otherStories) && (
        <Grid gap="card" alignItems="start" lg={layout} className={cnb('*:!h-auto', layout == 2 && 'xl:w-8/12 2xl:w-10/12 mx-auto')}>
          <CreateBloks blokSection={otherStories} />
        </Grid>
      )}
      {!!getNumBloks(ctaLink) && (
        <div className="rs-mt-3">
          <CreateBloks blokSection={ctaLink} />
        </div>
      )}
    </div>
  );
};
