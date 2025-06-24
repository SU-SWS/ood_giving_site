import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Typography';
import { getNumBloks } from '@/utilities/getNumBloks';

export type IconCardSectionProps = {
  iconCards?: SbBlokData[];
  iconCardHeading?: string;
}

/*
 * The Icon Card Section component is referenced by the Interior Page, Landing Page, Story page, and Support page types.
 */
export const IconCardSection = ({ iconCards, iconCardHeading }: IconCardSectionProps) => {
  const numCards = getNumBloks(iconCards);

  if (!numCards) {
    return null;
  }

  return (
    <section>
      <Heading srOnly>{iconCardHeading || 'Links to more information'}</Heading>
      <Container className={`flex ood-icon-card-section__container su-align-items-stretch su-flex-${numCards}-col`}>
        <CreateBloks blokSection={iconCards} />
      </Container>
    </section>
  );
};
