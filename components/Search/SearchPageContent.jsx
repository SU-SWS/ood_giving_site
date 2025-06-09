import React, { useMemo, useRef, useState } from 'react';
import {
  useStats,
  useInstantSearch,
  useClearRefinements,
  ClearRefinements,
} from 'react-instantsearch';
import SbEditable from 'storyblok-react';
import { cnb, dcnb } from 'cnbuilder';
import Icon from 'react-hero-icon';
import { Container } from '../layout/Container';
import Layout from '../partials/Layout';
import { Heading } from '../simple/Heading';
import { Grid } from '../layout/Grid';
import { GridCell } from '../layout/GridCell';
import SearchField from './SearchField';
import getNumBloks from '../../utilities/getNumBloks';
import CreateBloks from '../../utilities/createBloks';
import { Skiplink } from '../accessibility/Skiplink';
import SearchFacet from './SearchFacet';
import SearchResults from './SearchResults';
import SearchPager from './SearchPager';
import SearchNoResults from './SearchNoResults';
import SearchKeywordBanner from './SearchKeywordBanner';
import { SAAButton } from '../simple/SAAButton';
import useOnClickOutside from '../../hooks/useOnClickOutside';

/**
 * Content Block.
 *
 * @param {*} props
 * @returns
 */
const SearchPageContent = (props) => {
  const { blok } = props;
  const { nbHits, areHitsSorted, nbSortedHits } = useStats();
  const {
    status,
    results: { __isArtificial: isArtificial },
  } = useInstantSearch();
  const mobileFiltersRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const { refine: clearFilters } = useClearRefinements();
  const { maxPagerLinks, maxPagerLinksMobile } = blok;
  const maxPagerLinksInt = parseInt(maxPagerLinks, 10);
  const maxPagerLinksMobileInt = parseInt(maxPagerLinksMobile, 10);

  useOnClickOutside(mobileFiltersRef, () => {
    setOpened(false);
  });

  const resultCount = useMemo(() => {
    if (areHitsSorted) {
      return nbSortedHits;
    }
    return nbHits;
  }, [areHitsSorted, nbHits, nbSortedHits]);

  const isLoading = status === 'loading' && !isArtificial;
  const hasNoResults = resultCount === 0 && !isArtificial;

  return (
    <SbEditable content={blok}>
      <Layout hasHero={false} {...props} blok={blok}>
        <Container
          as="section"
          width="full"
          className="su-px-15 su-py-45 md:su-py-70 xl:su-py-108 su-text-center su-bg-fog-light su-flex-wrap"
          id="main-content"
        >
          <Heading level={1} font="serif" className="su-mb-0">
            {blok.pageTitle}
          </Heading>
        </Container>
        <Container
          as="section"
          width="site"
          className="su-py-45 su-max-w-full su-w-full md:su-py-80 "
        >
          <Grid gap xs={12} className="su-relative su-basefont-19 su-z-40">
            <GridCell
              xs={12}
              lg={resultCount > 0 ? 6 : 8}
              className={
                resultCount > 0 ? 'lg:su-col-start-4' : 'lg:su-col-start-3'
              }
            >
              <SearchField
                emptySearchMessage={blok.emptySearchMessage}
                className={cnb({ 'su-opacity-30': isLoading })}
              />
            </GridCell>
          </Grid>

          {/* MOBILE FILTERS */}
          <Grid ref={mobileFiltersRef} className="su-rs-mt-7 md:su-rs-mt-3">
            <GridCell
              xs={12}
              className="lg:su-grid-gap su-relative su-w-full su-z-10 lg:su-hidden"
            >
              <button
                type="button"
                className={dcnb(
                  'su-group su-flex su-w-full su-justify-between su-border su-px-20 su-text-21 su-font-semibold su-items-center su-transition-colors',
                  {
                    'su-border-digital-red su-text-white su-bg-digital-red':
                      opened,
                    'su-border-black-30 su-text-digital-red-light hocus:su-bg-digital-red hocus:su-border-digital-red hocus:su-text-white hocus:su-shadow-lg':
                      !opened,
                  },
                )}
                aria-expanded={opened}
                onClick={() => setOpened(!opened)}
              >
                <span className="su-py-14 su-flex">
                  {opened ? 'Filters' : ' Filter results'}
                </span>
                {opened ? (
                  <span className="su-ml-02em su-font-regular su-flex su-items-center su-text-18 group-hocus:su-underline">
                    Close
                    <Icon icon="x" className="su-w-14 su-ml-6" />
                  </span>
                ) : (
                  <span className="su-flex su-items-center su-mt-0 su-text-digital-red-light group-hocus:su-text-white hocus:su-shadow-none">
                    <Icon icon="chevron-down" />
                  </span>
                )}
              </button>

              <div
                className={dcnb('su-absolute su-w-full', {
                  'su-hidden': !opened,
                })}
              >
                <div
                  id="search-mobile-filters"
                  className={dcnb(
                    'su-left-0 su-w-full su-z-10 su-bg-white su-shadow-2xl su-border su-border-black-10 su-rs-px-1 su-rs-pt-1',
                  )}
                >
                  <SearchFacet
                    attribute="siteName"
                    label="Sites"
                    excludes={['YouTube', 'SoundCloud', 'Apple Podcasts']}
                  />
                  <SearchFacet
                    attribute="fileType"
                    label="Media"
                    excludes={['html', 'pdf']}
                    className={dcnb('su-rs-pb-0')}
                  />
                </div>
                <div
                  className={dcnb(
                    'su-flex su-justify-end su-rs-px-0 su-rs-py-1 su-bg-fog-light su-border-t su-border-black-20',
                    {
                      'su-hidden': !opened,
                    },
                  )}
                >
                  <button
                    type="button"
                    className="su-text-digital-red-light su-text-18 md:su-text-20 hocus:su-text-cardinal-red hocus:su-shadow-none hocus:su-underline su-transition-colors"
                    onClick={() => {
                      clearFilters();
                    }}
                  >
                    Clear all
                  </button>
                  <SAAButton
                    buttonStyle="primary"
                    size="small-short"
                    className="su-ml-36"
                    onClick={() => {
                      setOpened(false);
                    }}
                  >
                    View results
                  </SAAButton>
                </div>
              </div>
            </GridCell>
          </Grid>
          {/* END MOBILE FILTERS */}

          {getNumBloks(blok.aboveResultsContent) > 0 && (
            <div className="above-results-content su-rs-mt-7">
              <CreateBloks blokSection={blok.aboveResultsContent} />
            </div>
          )}

          <Grid
            xs={12}
            className={dcnb('filters su-rs-mt-7 lg:su-grid-gap', {
              'su-hidden': hasNoResults,
            })}
          >
            {/* DESKTOP FILTERS */}
            <GridCell xs={12} lg={3} className="su-mb-40 su-hidden lg:su-flex">
              <Skiplink
                anchorLink="#number-search-results"
                className="su-hidden lg:su-block"
              >
                Skip past filters to search results
              </Skiplink>
              <div className="su-w-full" id="search-desktop-filters">
                <div className="su-mb-14">
                  <h2 className="su-text-5xl su-font-bold su-mb-0">
                    Filter by
                  </h2>
                  <div className="su-min-h-28">
                    <ClearRefinements
                      translations={{
                        resetButtonText: 'Reset all filters',
                      }}
                      classNames={{
                        button:
                          'disabled:su-hidden su-text-3xl su-text-cardinal-red-light hover:su-underline su-underline-offset-2 hover:su-cursor-pointer hocus:su-text-black',
                      }}
                    />
                  </div>
                </div>

                <SearchFacet
                  attribute="siteName"
                  label="Sites"
                  excludes={['YouTube', 'SoundCloud', 'Apple Podcasts']}
                />
                <SearchFacet
                  attribute="fileType"
                  label="Media"
                  excludes={['html', 'pdf']}
                />
              </div>
            </GridCell>
            {/* END DESKTOP FILTERS */}

            <GridCell
              xs={12}
              lg={9}
              className="su-mb-40"
              id="search-results-section"
            >
              <SearchKeywordBanner />
              <SearchResults />
              <SearchPager
                maxDesktop={maxPagerLinksInt}
                maxMobile={maxPagerLinksMobileInt}
              />
            </GridCell>
          </Grid>

          {hasNoResults && (
            <Grid
              xs={12}
              className={cnb('su-rs-mt-7', { 'su-opacity-30': isLoading })}
            >
              <SearchNoResults
                heading={blok.noResultsHeading}
                body={blok.noResultsBody}
                additionalContent={blok.noResultsAdditionalContent}
              />
            </Grid>
          )}
        </Container>
      </Layout>
    </SbEditable>
  );
};

export default SearchPageContent;
