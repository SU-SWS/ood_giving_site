import { StoryblokProvider } from '@/components/StoryblokProvider';
import { Heap } from '@/components/Heap';

type StoryblokLayoutProps = {
  children: React.ReactNode,
};


const StoryblokLayout = ({ children }: StoryblokLayoutProps) => {
  return (
    <>
      <Heap />
      <StoryblokProvider>
        {children}
      </StoryblokProvider>
    </>
  );
};

export default StoryblokLayout;
