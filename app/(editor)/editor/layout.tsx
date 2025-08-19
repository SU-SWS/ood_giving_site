import { StoryblokProvider } from '@/components/StoryblokProvider';
import { Sa11yInit } from '@/components/Sa11yInit';

type StoryblokLayoutProps = {
  children: React.ReactNode,
};

// Control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
export const dynamic = 'force-dynamic';

const StoryblokLayout = ({ children }: StoryblokLayoutProps) => {
  return (
    <>
      <Sa11yInit />
      {children}
    </>
  );
};

export default StoryblokLayout;
