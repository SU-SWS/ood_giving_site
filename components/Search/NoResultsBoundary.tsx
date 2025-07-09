import { useInstantSearch } from 'react-instantsearch';
import { Heading, Paragraph } from '@/components/Typography';

export type NoResultsBoundaryProps = {
  children?: React.ReactNode;
  noResultsErrorTitle?: string;
  noResultsErrorText?: string;
};

export const NoResultsBoundary = ({
  children,
  noResultsErrorTitle,
  noResultsErrorText,
}: NoResultsBoundaryProps) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0 && !!results.query) {
    return (
      <>
        <Heading as="h2">
          {noResultsErrorTitle}
        </Heading>
        <Paragraph>
          {noResultsErrorText}
        </Paragraph>
      </>
    );
  }

  return children;
};
