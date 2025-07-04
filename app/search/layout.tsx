import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';
import { SearchHeader } from '@/components/Search';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { StoryblokProvider } from '@/components/StoryblokProvider';
import { getStoryDataCached } from '@/utilities/data';

type SearchLayoutProps = {
  children: React.ReactNode;
};

const SearchLayout = async ({ children }: SearchLayoutProps) => {
  const { data: endowedPositionsPage } = await getStoryDataCached({ path: 'home' });
  const {
    localHeader,
    localFooter,
    globalFooter,
    alertPicker,
  } = endowedPositionsPage.story.content;

  return (
    <StoryblokProvider>
      <CreateBloks blokSection={alertPicker} />
      <CreateBloks blokSection={localHeader} />
      <main id="main-content">
        <article className="bg-fog-light">
          <Container width="full">
            <SearchHeader />
            <Container as="section" className="py-90">
              <div className="xl:w-3/4 mx-auto lg:rs-px-4">
                {children}
              </div>
            </Container>
          </Container>
        </article>
      </main>
      <Footer localFooter={localFooter} globalFooter={globalFooter} />
    </StoryblokProvider>
  );
};

export default SearchLayout;
