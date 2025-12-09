import { Container } from '@/components/Container';
import { EndowedPositionsFooter, EndowedPositionsHeader } from '@/components/EndowedPositions';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { Header } from '@/components/Storyblok/partials/Header';
import { StoryblokProvider } from '@/components/StoryblokProvider';
import { Heap } from '@/components/Heap';
import { getStoryData } from '@/utilities/data';

type EndowedPositionsLayoutProps = {
  children: React.ReactNode;
};

const EndowedPositionsLayout = async ({ children }: EndowedPositionsLayoutProps) => {
  const { data: endowedPositionsPage } = await getStoryData({ path: 'endowed-positions' });
  const {
    localHeader,
    localFooter,
    globalFooter,
    alertPicker,
  } = endowedPositionsPage.story.content;

  return (
    <>
      <Heap />
      <StoryblokProvider>
        <Header alertPicker={alertPicker} localHeader={localHeader} />
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
      </StoryblokProvider>
    </>
  );
};

export default EndowedPositionsLayout;
