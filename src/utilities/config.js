// Global variables for this project.

const config = {
  isNetlify: process.env.NETLIFY ?? false,
  basePath: process.env.GATSBY_BASE_PATH === undefined ? '/' : process.env.GATSBY_BASE_PATH,
  breakpoint: {
    "2xs": 0,
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    "2xl": 1500
  },
};

export { config };
