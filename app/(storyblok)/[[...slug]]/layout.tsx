import { StoryblokProvider } from '@/components/StoryblokProvider';

type StoryblokLayoutProps = {
  children: React.ReactNode,
};

// Cache for one year.
export const revalidate = 31536000;

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
