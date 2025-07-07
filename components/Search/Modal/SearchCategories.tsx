import { useContext, useMemo } from 'react';
import { SearchModalContext } from './SearchModalContext';
import { Heading } from '@/components/Typography';
import { Grid } from '@/components/Grid';
import { CreateBloks } from '@/components/CreateBloks';

export const SearchCategories = () => {
  const {
    searchConfig,
  } = useContext(SearchModalContext);

  const {
    categoriesHeadline,
    categoriesLeftHeadline,
    categoriesLeftBox,
    categoriesRightHeadline,
    categoriesRightBox,
  } = searchConfig;

  const hasLeftCategories = useMemo(() => (
    (categoriesHeadline || categoriesLeftHeadline) && !!categoriesLeftBox?.length
  ), [categoriesHeadline, categoriesLeftHeadline, categoriesLeftBox]);
  const hasRightCategories = useMemo(() => (
    (categoriesHeadline || categoriesRightHeadline) && !!categoriesRightBox?.length
  ), [categoriesHeadline, categoriesRightHeadline, categoriesRightBox]);

  if (!hasLeftCategories && !hasRightCategories) {
    return null;
  }

  return (
    <div className="rs-mt-2">
      {!!categoriesHeadline && (
        <Heading as="h3" size="f1" color="white" className="mb-0">{categoriesHeadline}</Heading>
      )}
      <Grid md={2} className="gap-x-8 gap-y-40 mt-40">
        {hasLeftCategories && (
          <div>
            <Heading
              font="sans"
              as="h4"
              color="white"
              className="text-18 uppercase tracking-wider mb-0"
              id="searchCategoriesLeftHeadline"
            >
              {categoriesLeftHeadline}
            </Heading>
            <nav className="rs-mt-1" aria-labelledby={categoriesLeftHeadline ? 'searchCategoriesLeftHeadline' : 'searchCategoriesHeadline'}>
              <ul className="list-none p-0 m-0 flex flex-col gap-16">
                {categoriesLeftBox.map((cta) => (
                  <li key={cta._uid} className="mb-0"><CreateBloks blokSection={[cta]} /></li>
                ))}
              </ul>
            </nav>
          </div>
        )}
        {hasRightCategories && (
          <div>
            <Heading
              font="sans"
              as="h4"
              color="white"
              className="text-18 uppercase tracking-wider mb-0"
              id="searchCategoriesRightHeadline"
            >
              {categoriesRightHeadline}
            </Heading>
            <nav className="rs-mt-1" aria-labelledby={categoriesRightHeadline ? 'searchCategoriesRightHeadline' : 'searchCategoriesHeadline'}>
              <ul className="list-none p-0 m-0 flex flex-col gap-16">
                {categoriesLeftBox.map((cta) => (
                  <li key={cta._uid} className="mb-0"><CreateBloks blokSection={[cta]} /></li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </Grid>
    </div>
  );
};
