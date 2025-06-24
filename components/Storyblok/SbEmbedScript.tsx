import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { EmbedScript } from '@/components/EmbedScript';

type SbEmbedScriptProps = {
  blok: SbBlokData & {
    script?: string;
  };
};

export const SbEmbedScript = (props: SbEmbedScriptProps) => (
  <EmbedScript {...storyblokEditable(props.blok)} script={props.blok.script} />
);
