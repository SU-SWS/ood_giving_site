import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { CtaGroup, type CtaGroupDisplayType } from '@/components/Cta';
import { getNumBloks } from '@/utilities/getNumBloks';

type SbCtaGroupProps = {
  blok: SbBlokData & {
    ctaLinks?: SbBlokData[];
    display?: CtaGroupDisplayType;
  };
};

export const SbCtaGroup = (props: SbCtaGroupProps) => {
  const { ctaLinks, display } = props.blok;
  if (!getNumBloks(ctaLinks)) {
    return null; // Return null if there are no ctaLinks to display
  }

  return (
    <CtaGroup display={display} {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={ctaLinks} isListItems />
    </CtaGroup>
  );
};
