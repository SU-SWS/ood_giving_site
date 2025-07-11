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
    <Grid {...storyblokEditable(blok)} className="gap-y-32 md:gap-y-45 2xl:gap-y-48">
      {!!getNumBloks(featuredStories) && (
        <Grid className="xl:w-10/12 mx-auto">
          <CreateBloks blokSection={featuredStories} />
        </Grid>
      )}
      {!!getNumBloks(otherStories) && (
        <Grid as="ul" gap="card" alignItems="start" md={2} xl={layout} className={cnb('pl-0 *:!h-auto *:list-unstyled', layout == 2 && 'xl:w-10/12 2xl:w-8/12 mx-auto')}>
          <CreateBloks blokSection={otherStories} isListItems />
        </Grid>
      )}
      {!!getNumBloks(ctaLink) && (
        <div>
          <CreateBloks blokSection={ctaLink} />
        </div>
      )}
    </Grid>
  );
};
