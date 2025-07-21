'use client';
import { type MouseEventHandler, useCallback, useEffect } from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';
import { HeaderNoImage } from '@/components/Storyblok/PageHeader/HeaderNoImage';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
import { Grid } from '@/components/Grid';
import { Heading, SrOnlyText } from '@/components/Typography';
import { type DarkBgColorType } from '@/utilities/datasource';


export type SbSupportPageProps = {
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
    dei: SbBlokData[];
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

export const SbSupportPage = (props: SbSupportPageProps) => {
  const { push } = useRouter();

  // TODO: Make sure this actually works
  const updateHash: MouseEventHandler<HTMLInputElement> = useCallback((e) => {
    push(`#${e.currentTarget.id}`, { scroll: false });
  }, [push]);

  /**
   * Sets filter state from URL fragment.
   */
  const setActiveFilter = () => {
    const activeId = window.location.hash.substr(1);
    // Simulate click to set the initial filter state.
    const filterButton = document.getElementById(activeId);
    if (filterButton) {
      filterButton.click();
    }
  };

  useEffect(() => {
    // Set the initial filter state from URL fragment.
    if (window.location.hash) {
      setActiveFilter();
    }

    // Event listener used for 'back button' nagivation.
    window.addEventListener('hashchange', setActiveFilter);
  }, []); // Empty array ensures this effect is only called once on page load.

  return (
    <PageLayout
      blok={props.blok}
      slug={props.slug}
      alertPicker={props.blok.alertPicker}
      localHeader={props.blok.localHeader}
      belowContent={props.blok.belowContent}
      iconCards={props.blok.iconCards}
      iconCardHeading={props.blok.iconCardHeading}
      localFooter={props.blok.localFooter}
      globalFooter={props.blok.globalFooter}
      mainClassName="ood-interior-page--no-image ood-support-page"
    >
      <HeaderNoImage
        title={props.blok.title}
        intro={props.blok.intro}
        headerBackgroundColor={props.blok.headerBackgroundColor}
      />
      <section className="ood-interior-page__body ood-support-page__body">
        {props.blok.bodyTitle && (
          <header className="centered-container ood-interior-page__body-header text-left">
            <Heading className="ood-interior-page__body-header-title ood-has-tab-before">
              {props.blok.bodyTitle}
            </Heading>
          </header>
        )}
        <SrOnlyText as="p">{props.blok.srText}</SrOnlyText>
        <Container className="ood-support-page__filter-container">
          <input
            type="radio"
            id="undergraduate"
            name="areas-to-support"
            onClick={updateHash}
            defaultChecked
          />
          <label htmlFor="undergraduate">Undergraduate Education</label>
          <input
            type="radio"
            id="grad"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="grad">Graduate Education</label>
          <input
            type="radio"
            id="arts"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="arts">Arts + Humanities</label>
          <input
            type="radio"
            id="athletics"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="athletics">Athletics</label>
          <input
            type="radio"
            id="business"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="business">Business + Economics</label>
          <input
            type="radio"
            id="culture"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="culture">Culture, Ethics, + Service</label>
          <input
            type="radio"
            id="dei"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="dei">Diversity, Equity, + Inclusion</label>
          <input
            type="radio"
            id="law"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="law">Law, Policy, + Government</label>
          <input
            type="radio"
            id="medicine"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="medicine">Medicine</label>
          <input
            type="radio"
            id="science"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="science">Science + Technology</label>
          <input
            type="radio"
            id="sustainability"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="sustainability">Sustainability</label>
          <input
            type="radio"
            id="teaching"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="teaching">Teaching + Learning</label>
          <input
            type="radio"
            id="all"
            name="areas-to-support"
            onClick={updateHash}
          />
          <label htmlFor="all">All</label>
          <Grid sm={2} lg={3} gap="default" className="rs-mt-2 rs-mb-4">
            <CreateBloks blokSection={props.blok.undergraduate} />
            <CreateBloks blokSection={props.blok.graduate} />
            <CreateBloks blokSection={props.blok.arts} />
            <CreateBloks blokSection={props.blok.athletics} />
            <CreateBloks blokSection={props.blok.business} />
            <CreateBloks blokSection={props.blok.culture} />
            <CreateBloks blokSection={props.blok.dei} />
            <CreateBloks blokSection={props.blok.law} />
            <CreateBloks blokSection={props.blok.medicine} />
            <CreateBloks blokSection={props.blok.science} />
            <CreateBloks blokSection={props.blok.sustainability} />
            <CreateBloks blokSection={props.blok.teaching} />
          </Grid>
        </Container>
      </section>
    </PageLayout>
  );
};
