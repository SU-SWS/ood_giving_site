'use client';
import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { Container } from '@/components/Container';
import { HeaderNoImage } from '@/components/Storyblok/PageHeader/HeaderNoImage';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
import { Grid } from '@/components/Grid';
import { Heading } from '@/components/Typography';
import { CtaButton, CtaGroup } from '@/components/Cta';
import { SbSupportCard } from '@/components/Storyblok/SbSupportCard';
import { type SbSupportCardBlokProps } from '@/components/Storyblok/SbSupportCard';
import { type AreasToSupportType, areasToSupport } from './taxonomy';
import { type DarkBgColorType } from '@/utilities/datasource';
import * as styles from './SbSupportPage.styles';

type SbSupportPageProps = {
  blok: SbBlokData & {
    title?: string;
    intro?: StoryblokRichtext;
    headerBackgroundColor?: DarkBgColorType;
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    bodyTitle: string;
    undergraduate: SbSupportCardBlokProps[];
    graduate: SbSupportCardBlokProps[];
    arts: SbSupportCardBlokProps[];
    athletics: SbSupportCardBlokProps[];
    business: SbSupportCardBlokProps[];
    culture: SbSupportCardBlokProps[];
    ideal: SbSupportCardBlokProps[];
    law: SbSupportCardBlokProps[];
    medicine: SbSupportCardBlokProps[];
    science: SbSupportCardBlokProps[];
    sustainability: SbSupportCardBlokProps[];
    teaching: SbSupportCardBlokProps[];
    // Below content
    belowContent?: SbBlokData[];
    iconCardHeading?: string;
    iconCards?: SbBlokData[];
    // Footer
    localFooter?: SbBlokData[];
    globalFooter?: SbBlokData[];
  };
  slug?: string;
};

export const SbSupportPage = ({ blok, slug }: SbSupportPageProps) => {
  const {
    title,
    intro,
    headerBackgroundColor,
    localHeader,
    alertPicker,
    bodyTitle,
    undergraduate,
    graduate,
    arts,
    athletics,
    business,
    culture,
    ideal,
    law,
    medicine,
    science,
    sustainability,
    teaching,
    belowContent,
    iconCardHeading,
    iconCards,
    localFooter,
    globalFooter,
  } = blok;

  const [activeFilter, setActiveFilter] = useState<AreasToSupportType>('all');

  // Initialize filter from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the '#' symbol
    if (hash && Object.keys(areasToSupport).includes(hash)) {
      setActiveFilter(hash as AreasToSupportType);
    }
  }, []);

  /**
   * Get a combined array of all the support card data added to the below Storyblok regions.
   * Note: The name of these regions does not match the taxonomy values, and they don't actually affect the filtering logic.
   * The filtering logic is based on the list of taxonomy terms selected in each Support Card.
   */
  const allSupportCards = useMemo(() => [
    ...undergraduate,
    ...graduate,
    ...arts,
    ...athletics,
    ...business,
    ...culture,
    ...ideal,
    ...law,
    ...medicine,
    ...science,
    ...sustainability,
    ...teaching,
  ], [
    undergraduate, graduate, arts, athletics, business, culture,
    ideal, law, medicine, science, sustainability, teaching,
  ]);

  const filteredCards = useMemo(() => {
    if (activeFilter === 'all') {
      return allSupportCards;
    }

    // Keep only cards that have same taxonomy as active filter
    return allSupportCards.filter((card) => card.taxonomy?.includes(activeFilter));
  }, [allSupportCards, activeFilter]);

  // Handle filter button click
  const handleFilterClick = (area: AreasToSupportType) => {
    setActiveFilter(area);

    // Update URL hash without adding to browser history
    const url = area === 'all'
      ? window.location.pathname
      : `${window.location.pathname}#${area}`;

    window.history.replaceState(null, '', url);
  };

  return (
    <PageLayout
      blok={blok}
      slug={slug}
      alertPicker={alertPicker}
      localHeader={localHeader}
      belowContent={belowContent}
      iconCards={iconCards}
      iconCardHeading={iconCardHeading}
      localFooter={localFooter}
      globalFooter={globalFooter}
    >
      <HeaderNoImage
        title={title}
        intro={intro}
        headerBackgroundColor={headerBackgroundColor || 'palo-alto-dark'}
      />
      <Container as="section" pt={6}>
        {bodyTitle && (
          <Container as="header">
            <Heading size={4} mb={5} className={styles.heading}>
              {bodyTitle}
            </Heading>
          </Container>
        )}
        <Container>
          <CtaGroup role="group" aria-label="Filter by area to support" display="inline-block">
            {Object.entries(areasToSupport).map(([key, label]) => (
              <CtaButton
                key={key}
                isButton
                buttonStyle="ood-cta__button--secondary su-after-bg-bay-dark su-after-bg-hocus-white"
                onClick={() => handleFilterClick(key as AreasToSupportType)}
                aria-pressed={activeFilter === key}
                className={styles.filterButton}
              >
                {label}
              </CtaButton>
            ))}
          </CtaGroup>
          <Grid
            role="region"
            aria-live="polite"
            aria-label="Filtered results"
            as="ul"
            sm={2}
            lg={3}
            gap="default"
            mt={4}
            mb={9}
            alignItems="stretch"
            className="list-unstyled"
          >
            <AnimatePresence mode="popLayout">
              {filteredCards.map((cardBlok) => (
                <m.li
                  key={cardBlok._uid}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={styles.listItem}
                >
                  <SbSupportCard blok={cardBlok} />
                </m.li>
              ))}
            </AnimatePresence>
          </Grid>
        </Container>
      </Container>
    </PageLayout>
  );
};
