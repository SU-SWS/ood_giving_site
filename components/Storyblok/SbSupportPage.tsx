import React, { type MouseEventHandler, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { HeaderNoImage, type HeaderNoImageProps } from '@/components/Storyblok/partials/HeaderNoImage';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';
import { BelowContent, type BelowContentProps } from '@/components/Storyblok/partials/BelowContent';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Heading } from '@/components/Storyblok/partials/Heading';

export type SbSupportPageProps = HeaderNoImageProps & IconCardSectionProps & FooterProps & BelowContentProps & {
  blok: SbBlokData & {
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
  }
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
    <div {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <CreateBloks blokSection={props.blok.localHeader} />
      <main
        id="main-content"
        className="ood-interior-page--no-image ood-support-page"
      >
        <article className={`su-bg-fog-light`}>
          <HeaderNoImage {...props} />
          <section className="ood-interior-page__body ood-support-page__body">
            {props.blok.bodyTitle && (
              <header className="centered-container ood-interior-page__body-header su-text-align-left">
                <Heading
                  level={'h2'}
                  weight={'bold'}
                  serif={true}
                  classes="ood-interior-page__body-header-title ood-has-tab-before"
                >
                  {props.blok.bodyTitle}
                </Heading>
              </header>
            )}
            <p className={`su-sr-only-element`}>{props.blok.srText}</p>
            <CenteredContainer classes={'ood-support-page__filter-container'}>
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
              <div className={`grid-3-column su-mt-2 su-mb-4`}>
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
              </div>
            </CenteredContainer>
          </section>
          <BelowContent {...props} />
          <footer className="ood-support-page__main-footer">
            <IconCardSection {...props} />
          </footer>
        </article>
      </main>
      <Footer {...props} />
    </div>
  );
};
