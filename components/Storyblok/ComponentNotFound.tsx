import { type SbBlokData } from '@storyblok/react/rsc';

type ComponentNotFoundProps = {
  component: {
    blok: SbBlokData;
  };
}

export const ComponentNotFound = ({ component: { blok } }: ComponentNotFoundProps) => (
  <div className="rs-p-6 bg-red-600"><h2 className="text-white">{blok.component} component is missing from the codebase.</h2><p className="text-white">Source blok UID: {blok._uid}</p></div>
);
