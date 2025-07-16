import { CreateBloks } from '@/components/CreateBloks';
import { Skiplink } from '@/components/SkipLink';
import { type SbBlokData } from '@storyblok/react/rsc';
import { GlobalAlerts } from '@/components/Alert/GlobalAlerts';

export type HeaderProps = {
  alertPicker?: SbBlokData[];
  localHeader?: SbBlokData[];
  slug?: string;
}

export const Header = ({
  alertPicker,
  localHeader,
  slug,
}: HeaderProps) => (
  <header>
    <Skiplink />
    <GlobalAlerts />
    <CreateBloks blokSection={alertPicker} />
    <CreateBloks blokSection={localHeader} slug={slug} />
  </header>
);
