'use client';

import { StoryblokProvider } from '@/components/StoryblokProvider';
import { Sa11yInit } from '@/components/Sa11yInit';

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
