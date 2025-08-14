import { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paragraph } from '@/components/Typography';
import { SearchModalContext } from './SearchModalContext';
import { SearchForm } from '../SearchForm';
import * as styles from '../Search.styles';

export const SearchModalBox = () => {
  const router = useRouter();
  const { searchConfig, close } = useContext(SearchModalContext);
  const { emptySearchMessage } = searchConfig ?? {};
  const [showEmptyError, setShowEmptyError] = useState(false);

  const handleSubmit = useCallback((selected: string) => {
    close();
    router.push(`/search-results?q=${selected}`);
  }, [close, router]);

  return (
    <>
      <SearchForm
        variant="modal"
        onSubmit={handleSubmit}
        emptyErrorId="search-field-modal-empty-message"
        showEmptyError={showEmptyError}
        setShowEmptyError={setShowEmptyError}
      />
      <Paragraph
        className={styles.searchFormErrorMessage({ show: showEmptyError })}
        font="serif"
        weight="bold"
        color="white"
        mt={1}
        aria-hidden={!showEmptyError}
        id="search-field-modal-empty-message"
        size={1}
      >
        {emptySearchMessage}
      </Paragraph>
    </>
  );
};
