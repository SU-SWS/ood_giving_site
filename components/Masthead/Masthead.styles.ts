export const root = 'group w-full absolute top-0 z-50 transition-colors';

// Use a wider centered container (1800px wide at 4XL (2000px) breakpoint)
export const wrapper = 'cc 3xl:px-100 4xl:px-[calc((100%-1800px)/2)] py-12 sm:py-13 lg:py-20 transition';

// Pass in a root style for the lock up to scale everything within proportionally
// We use the group-has- TW selector to make the lockup white when the main nav is open
export const lockup = 'relative top-2 sm:top-0 z-[300] sm:-mt-02em shrink-0 sm:text-17 md:text-22 lg:text-28 group-has-[nav[data-headlessui-state="open"]]:*:*:text-white group-has-[nav[data-headlessui-state="open"]]:even:*:*:bg-white';

export const logoImage = 'max-w-full w-200 md:w-[26rem] lg:w-300 xl:w-[36rem]';

export const flexbox = 'gap-x-12 sm:gap-x-20 md:gap-x-30';

// We use the group-has- TW selector to make the Giving link white when the main nav is open
export const cta = 'relative z-[300] group-has-[nav[data-headlessui-state="open"]]:text-white group-has-[nav[data-headlessui-state="open"]]:decoration-white';
