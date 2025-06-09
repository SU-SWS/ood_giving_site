// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const oodCampaignPage = () => ({ addComponents, theme }: { addComponents: Function, theme: Function }) => {
  const components = {
    '.campaign-page': {
      '&__hero-fullwidth-image': {
        padding: '10.7rem 0 4.5rem',
        '& .campaign-page__image-wrapper': {
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
        '& .campaign-page__hero-content-wrapper': {
          background: 'inherit',
          position: 'relative',
          zIndex: 1,
        },
        '& .campaign-page__hero-content-logo': {

        },
        '& .campaign-page__hero-content': {
          '&-wrapper': {
            '& > .campaign-page__hero-content-logo + *': {

            },
            '& * + .ood-cta': {

            },
            '& * + .campaign-page__hero-bar, & * + .campaign-page__hero-intro': {
              marginTop: '2rem',
            },
          },
        },

      },
    },
  };

  addComponents(components);
};
