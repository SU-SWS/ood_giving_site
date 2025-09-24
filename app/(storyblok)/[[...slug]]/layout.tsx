import { StoryblokProvider } from '@/components/StoryblokProvider';

type StoryblokLayoutProps = {
  children: React.ReactNode,
};

// Cache for 10 minutes.
export const revalidate = 600;

// Force static rendering.
export const dynamic = 'force-static';

const StoryblokLayout = ({ children }: StoryblokLayoutProps) => {
  return (
    <StoryblokProvider>
      {children}
    </StoryblokProvider>
  );
};

export default StoryblokLayout;
