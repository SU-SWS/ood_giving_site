'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Container } from '@/components/Container';
import { logError } from '@/utilities/logger';

const Error = ({error}: {
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // Log the error with comprehensive context for debugging
    logError('Global error boundary caught unhandled exception', error, {
      digest: error.digest,
      errorName: error.name,
      errorMessage: error.message,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    });
  }, [error]);

  return (
    // global-error must include html and body tags
    // https://nextjs.org/docs/app/getting-started/error-handling#global-errors
    <html lang="en">
      <body>
        <main>
          <Container width="site" className="rs-my-8 text-white">
            <h1>Something went wrong.</h1>
            <p>Try refreshing your browser.</p>
          </Container>
        </main>
      </body>
    </html>
  );
};

export default Error;
