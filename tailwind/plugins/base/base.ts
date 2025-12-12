
export const base = ({ addBase, config }: { addBase: Function, config: Function }) => {
  addBase({
    html: {
      overflowY: 'scroll',
      scrollBehavior: 'smooth',
    },
    body: {
      width: '100%',
      overflowX: 'clip',
      fontSize: '1.6rem',
      color: config('theme.colors.black.DEFAULT'),

      '@screen md': {
        fontSize: '1.8rem',
      },
      '@screen 2xl': {
        fontSize: '1.9rem',
      },
    },
    a: {
      color: config('theme.colors.digital-red.DEFAULT'),
      transition: 'color 0.25s ease-out',

      '&:hover, &:focus': {
        color: config('theme.colors.sky.dark'),
      },
    },
    p: {
      lineHeight: '1.5',
      '&:empty': {
        display: 'none',
      },
    },
    'b, strong': {
      fontWeight: config('theme.fontWeight.bold'),
    },
  });
};
