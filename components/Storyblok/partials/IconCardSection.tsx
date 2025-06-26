import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Container } from '@/components/Container';
import { FlexBox } from '@/components/FlexBox';
import { Heading } from '@/components/Typography';
import { getNumBloks } from '@/utilities/getNumBloks';

export type IconCardSectionProps = {
  iconCards?: SbBlokData[];
  iconCardHeading?: string;
}

/*
 * The Icon Card Section component is referenced by all page types - Interior, Landing, Story, Story Overview, Support, Campaign
 */
export const IconCardSection = ({ iconCards, iconCardHeading }: IconCardSectionProps) => {
  const numCards = getNumBloks(iconCards);

  if (!numCards) {
    return null;
  }

  return (
    <Container as="section" bgColor="black-10" py={6} className="print:hidden grow-0">
      <Heading srOnly>{iconCardHeading || 'Links to more information'}</Heading>
      <FlexBox gap="card" alignItems="stretch" className="flex-col lg:flex-row">
        <CreateBloks blokSection={iconCards} />
      </FlexBox>
    </Container>
  );
};
