import { StoryblokProvider } from '@/components/StoryblokProvider';

type StoryblokLayoutProps = {
  children: React.ReactNode,
};

// Cache for one year.
// I have no concrete evidence but this seems to work best with Netlify's edge caching over caching for infinity.
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
