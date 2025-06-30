import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';
import { EndowedPositionsFooter, EndowedPositionsHeader } from '@/components/EndowedPositions';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { StoryblokProvider } from '@/components/StoryblokProvider';
import { getStoryDataCached } from '@/utilities/data';
import { getStoryblokApi } from '@/utilities/storyblok';

type EndowedPositionsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

getStoryblokApi();

const EndowedPositionsLayout = async ({ children, params }: EndowedPositionsLayoutProps) => {
  const { slug = 'search' } = await params;

  console.log({ slug });
  const { data: endowedPositionsPage } = await getStoryDataCached({ path: 'endowed-positions' });
  const {
    localHeader,
    localFooter,
    globalFooter,
    alertPicker,
  } = endowedPositionsPage.story.content;

  return (
    <StoryblokProvider>
      <div>
        <CreateBloks blokSection={alertPicker} />
        <CreateBloks blokSection={localHeader} />
        <main id="main-content">
          <article className="bg-fog-light">
            <Container width="full">
              <EndowedPositionsHeader />
              <Container as="section" className="py-90">
                <div className="xl:w-3/4 mx-auto lg:rs-px-4">
                  {children}
                  <EndowedPositionsFooter />
                </div>
              </Container>
            </Container>
          </article>
        </main>
        <Footer localFooter={localFooter} globalFooter={globalFooter} />
      </div>
    </StoryblokProvider>
  );
};

export default EndowedPositionsLayout;

// <CreateStories stories={[localHeader.story]} />
// <CreateBloks blokSection={alertPicker} />
//  <Footer localFooter={localFooter} globalFooter={globalFooter} />
