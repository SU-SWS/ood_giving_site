import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';
import { CreateStories } from '@/components/CreateStories';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { getStoryDataCached } from '@/utilities/data';

type EndowedPositionsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

const EndowedPositionsLayout = async ({ children, params }: EndowedPositionsLayoutProps) => {
  const { slug } = await params;
  console.log({ layoutSlug: slug });

  const { data: localHeader } = await getStoryDataCached({ path: 'global-components/headers/giving-site-default-header' });
  console.log({ localHeader });

  return (
    <div>
      <CreateStories stories={[localHeader.story]} />
      <main id="main-content">
        <article className="bg-fog-light">
          <Container width="full" pt={6}>
            {children}
          </Container>
        </article>
      </main>
    </div>
  );
};

export default EndowedPositionsLayout;

// <CreateBloks blokSection={alertPicker} />
//  <Footer localFooter={localFooter} globalFooter={globalFooter} />
