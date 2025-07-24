'use client';
import { useState, useMemo } from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { Container } from '@/components/Container';
import { HeaderNoImage } from '@/components/Storyblok/PageHeader/HeaderNoImage';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
import { Grid } from '@/components/Grid';
import { Heading, SrOnlyText } from '@/components/Typography';
import { CtaButton, CtaGroup } from '@/components/Cta';
import { SbSupportCard } from '@/components/Storyblok/SbSupportCard';
import { type AreasToSupportType, areasToSupport } from './taxonomy';
import { type SbLinkType, type SbFontawesomeSelectorType } from '@/components/Storyblok/Storyblok.types';
import { type AllCardBgColorType } from '@/utilities/datasource';
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
    srText: string;
    undergraduate: SbBlokData[];
    graduate: SbBlokData[];
    arts: SbBlokData[];
    athletics: SbBlokData[];
    business: SbBlokData[];
    culture: SbBlokData[];
    ideal: SbBlokData[];
    law: SbBlokData[];
    medicine: SbBlokData[];
    science: SbBlokData[];
    sustainability: SbBlokData[];
    teaching: SbBlokData[];
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
    headerBackgroundColor = 'palo-alto-dark',
    localHeader,
    alertPicker,
    bodyTitle,
    srText,
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

  // State for active filter
  const [activeFilter, setActiveFilter] = useState<AreasToSupportType>('all');

  // Get an array of all the support card data from undergraduate, graduate, arts, athletics, business, culture, ideal, law, medicine, science, sustainability, and teaching regions.
  const supportCardData = useMemo(() => [
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

  // Filter cards based on active filter
  const filteredCards = useMemo(() => {
    if (activeFilter === 'all') {
      return supportCardData;
    }

    return supportCardData.filter((cardBlok) => {
      const cardData = cardBlok as SbBlokData & {
        taxonomy: AreasToSupportType[];
      };
      return cardData.taxonomy?.includes(activeFilter);
    });
  }, [supportCardData, activeFilter]);

  // Handle filter button click
  const handleFilterClick = (filterType: AreasToSupportType) => {
    setActiveFilter(filterType);
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
        headerBackgroundColor={headerBackgroundColor}
      />
      <Container as="section" pt={6}>
        {bodyTitle && (
          <Container as="header">
            <Heading size={4} mb={5} className={styles.heading}>
              {bodyTitle}
            </Heading>
          </Container>
        )}
        <SrOnlyText as="p">{srText}</SrOnlyText>
        <Container>
          <CtaGroup role="group" aria-label="Filter by area to support" display="inline-block">
            {Object.entries(areasToSupport).map(([key, label]) => (
              <CtaButton
                key={key}
                isButton
                buttonStyle="ood-cta__button--secondary su-after-bg-bay-dark su-after-bg-hocus-white"
                onClick={() => handleFilterClick(key as AreasToSupportType)}
                aria-pressed={activeFilter === key}
                className="aria-pressed:bg-palo-alto-dark aria-pressed:text-white aria-pressed:focus:bg-palo-alto-dark"
              >
                {label}
              </CtaButton>
            ))}
          </CtaGroup>
          <Grid aria-live="polite" sm={2} lg={3} gap="default" mt={4} mb={4}>
            {filteredCards.map((cardBlok) => (
              <SbSupportCard
                key={cardBlok._uid}
                blok={cardBlok as SbBlokData & {
                  _uid?: string;
                  taxonomy: AreasToSupportType[];
                  headline: string;
                  link: SbLinkType;
                  icon?: SbFontawesomeSelectorType;
                  extraIcon?: string;
                  iconStyle?: 'fas' | 'far';
                  backgroundColor?: AllCardBgColorType;
                }}
              />
            ))}
          </Grid>
        </Container>
      </Container>
    </PageLayout>
  );
};
