import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { EndowedPositionsSearch } from '@/components/EndowedPositions';

type SbEndowedPositionsSearchProps = {
  blok: SbBlokData;
};

export const SbEndowedPositionsSearch = (props: SbEndowedPositionsSearchProps) => (
  <EndowedPositionsSearch {...storyblokEditable(props.blok)} />
);
