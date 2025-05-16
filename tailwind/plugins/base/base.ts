/* eslint-disable @typescript-eslint/no-unsafe-function-type */
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
      color: '#17171A',

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
      '&:empty': {
        display: 'none',
      },
    },
  });
};
