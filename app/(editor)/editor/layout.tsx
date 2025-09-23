'use client';

import { StoryblokProvider } from '@/components/StoryblokProvider';
import { Sa11yInit } from '@/components/Sa11yInit';

// Force dynamic rendering for editor functionality
export const dynamic = 'force-dynamic';

// Disable caching for real-time editor preview
export const revalidate = 0;

type StoryblokLayoutProps = {
  children: React.ReactNode,
};

const StoryblokLayout = ({ children }: StoryblokLayoutProps) => {
  return (
    <>
      <Sa11yInit />
      <StoryblokProvider isEditor={true}>
        {children}
      </StoryblokProvider>
    </>
  );
};

export default StoryblokLayout;
