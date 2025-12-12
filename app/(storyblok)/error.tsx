'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Container } from '@/components/Container';
import { logError } from '@/utilities/logger';

const Error = ({error}: {
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // Log the error with comprehensive context for debugging
    logError('Storyblok page error boundary caught exception', error, {
      digest: error.digest,
      errorName: error.name,
      errorMessage: error.message,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      pathname: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
  }, [error]);

  return (
    <div className="bg-black">
      <main>
        <Container width="site" className="rs-my-8 text-white">
          <h1>Something went wrong.</h1>
          <p>Try refreshing your browser.</p>
        </Container>
      </main>
    </div>
  );
};

export default Error;
