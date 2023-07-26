import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchOverlayOpenContext } from '../../context/searchOverlayStatusProvider';
import { navigate } from 'gatsby';
import UseEscape from '../../hooks/useEscape';
import UseSearchOverlayData from '../../hooks/useSearchOverlayData';
import { LocationProvider } from '@reach/router';
import CtaLink from '../simple/ctaLink';
import { config } from '../../utilities/config';
import UseFocusTrap from '../../hooks/useFocusTrap';
import { searchClient } from './searchResults';
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import Autocomplete from './autocomplete';
import Heading from '../partials/heading';
import CenteredContainer from '../partials/centeredContainer';
import FlexCell from '../partials/flexCell';

const SearchOverlay = () => {
  const { isOpen, closeSearchOverlay } = useContext(SearchOverlayOpenContext);
  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // when the search overlay opens, immediately give focus to the input
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen, inputRef]);

  const previousSubmittedTermRef = useRef('');

  const submitTerm = (term) => {
    if (term.length > 0 && term !== previousSubmittedTermRef.current) {
      navigate(`${config.basePath}search-results?term=${term}`);

      closeSearchOverlay();
    } else {
      setIsEmptyErrorVisible(true);
    }
    previousSubmittedTermRef.current = term;
  };

  const handleSuggestionCleared = () => {
    setIsEmptyErrorVisible(false);
  };

  UseEscape(() => isOpen && closeSearchOverlay());

  const {
    introduction,
    categoriesLeftHeadline,
    categoriesLeftBox,
    categoriesRightHeadline,
    categoriesRightBox,
    categoriesHeadline,
    emptySearchMessage,
    suggestionsAmount,
  } = UseSearchOverlayData();

  // collect refs of both the first and last tabbable element of the overlay
  // we need these refs to trap the focus inside the overlay
  const firstTabbableRef = useRef();
  const lastTabbableRef = useRef();
  UseFocusTrap(firstTabbableRef, lastTabbableRef, isOpen);

  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Search this site"
      className={`search-overlay ${isOpen ? 'visible' : 'hidden'}`}
    >
      <LocationProvider>
        <CenteredContainer classes="search-container su-pt-5" flex={true}>
          <FlexCell lg={11} xl={9} xxl={8} classes="su-mx-auto">
            <div className="search-header">
              <button
                type="button"
                className="search-close-button"
                onClick={closeSearchOverlay}
                ref={firstTabbableRef}
                aria-label="Close Search"
              >
                Close
                <i aria-hidden="true" className="fas fa-times" />
              </button>
            </div>
            <div className="search-body">
              <Heading
                level={'h2'}
                classes="search-heading su-mb-4"
                serif={true}
                weight={'bold'}
                color={'white'}
                align={'center'}
              >
                {introduction}
              </Heading>
              <InstantSearch
                searchClient={searchClient}
                indexName={process.env.GATSBY_ALGOLIA_SUGGESTIONS_INDEX_NAME}
              >
                {isOpen && (
                  <Autocomplete
                    inputId="search-overlay-input"
                    listboxId="search-overlay-listbox"
                    onSubmit={submitTerm}
                    onSuggestionCleared={handleSuggestionCleared}
                    ref={inputRef}
                    skipInitialTermFromParam
                  />
                )}
                <Configure hitsPerPage={parseInt(suggestionsAmount) ?? 10} />
              </InstantSearch>
            </div>
            <p
              className={`search-error su-serif su-bold ${
                isEmptyErrorVisible ? 'search-error--visible' : ''
              }`}
            >
              {emptySearchMessage}
            </p>
            <div className="search-footer su-mt-3">
              <Heading
                level={'h3'}
                classes="search-categories-headline su-mb-2"
                serif={true}
                weight={'bold'}
                color={'white'}
              >
                {categoriesHeadline}
              </Heading>
              <div className="su-flex search-footer-cols">
                <FlexCell md={6} classes="search-footer-col">
                  <Heading
                    level={'h4'}
                    weight={'semibold'}
                    color={'white'}
                    classes="search-category-title su-mb-1"
                  >
                    {categoriesLeftHeadline}
                  </Heading>
                  <ul className="search-categories">
                    {categoriesLeftBox.map((link, idx) => (
                      <li
                        className="search-category-link"
                        key={idx}
                        onClick={closeSearchOverlay}
                      >
                        <CtaLink blok={link} />
                      </li>
                    ))}
                  </ul>
                </FlexCell>
                <FlexCell md={6} classes="search-footer-col">
                  <Heading
                    level={'h4'}
                    weight={'semibold'}
                    color={'white'}
                    classes="search-category-title su-mb-1"
                  >
                    {categoriesRightHeadline}
                  </Heading>
                  <ul className="search-categories">
                    {categoriesRightBox.map((link, idx) => (
                      <li
                        className="search-category-link"
                        key={idx}
                        onClick={closeSearchOverlay}
                      >
                        <CtaLink
                          {...(idx + 1 === categoriesRightBox.length
                            ? { ref: lastTabbableRef }
                            : {})}
                          blok={link}
                        />
                      </li>
                    ))}
                  </ul>
                </FlexCell>
              </div>
            </div>
          </FlexCell>
        </CenteredContainer>
      </LocationProvider>
    </div>
  );
};
export default SearchOverlay;
