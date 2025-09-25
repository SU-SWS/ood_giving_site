import { StoryblokProvider } from '@/components/StoryblokProvider';

type StoryblokLayoutProps = {
  children: React.ReactNode,
};

const StoryblokLayout = ({ children }: StoryblokLayoutProps) => {
  return (
    <StoryblokProvider>
      {children}
    </StoryblokProvider>
  );
};

export default StoryblokLayout;
