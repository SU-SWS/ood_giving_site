import React, { useContext } from 'react';
import { SearchOverlayOpenContext } from './SearchOverlayStatusProvider';
import { SrOnlyText } from '@/components/Typography';

export const HeaderSearchButton = () => {
  const { toggleSearchOverlay } = useContext(SearchOverlayOpenContext);

  return (
    <button
      type="button"
      className="ood-header__search-button"
      onClick={toggleSearchOverlay}
    >
      <span className="ood-header__search-button-text">Search</span>
      <SrOnlyText as="span"> this site</SrOnlyText>
      <i
        className="ood-header__search-button-icon fa-flip-horizontal"
        aria-hidden
      />
    </button>
  );
};
