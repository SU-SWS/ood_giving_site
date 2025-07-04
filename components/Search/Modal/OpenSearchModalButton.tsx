'use client';
import React, { useContext } from 'react';
import { SearchModalContext } from './SearchModalContext';
import { HeroIcon } from '@/components/HeroIcon';
import * as styles from '../Search.styles';

export const OpenSearchModalButton = React.forwardRef<HTMLButtonElement, { id: string }>(({ id }, ref) => {
  const { open } = useContext(SearchModalContext);

  return (
    <button
      data-test="search--nav-bar"
      type="button"
      className={styles.searchButton}
      aria-label="Search Giving"
      onClick={open}
      id={id}
      ref={ref}
    >
      <span className={styles.searchButtonText}>
        Search
      </span>
      <HeroIcon
        icon="search"
        aria-hidden="true"
        className={styles.searchButtonIcon}
      />
    </button>
  );
});
