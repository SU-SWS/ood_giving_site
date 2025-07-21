import { cnb } from 'cnbuilder';

export const countdownPie = 'h-[min-content] aspect-1';
export const countdownRing = 'rounded-full aspect-1';
export const countdownContent = ({ shrink = false }: { shrink?: boolean } = {}) => cnb(
  'bg-white p-12  rounded-full aspect-1 w-full',
  {
    'm-12 xs:m-20': shrink,
    'm-20': !shrink,
  },
);
export const countdownNumber = ({ larger = false, font }: { larger?: boolean, font: 'sans' | 'serif' }) => cnb(
  'font-bold text-center',
  {
    'text-[clamp(2.6rem,_7.59vi_+_.0171rem,_6rem)] md:text-[6rem]': !larger,
    'text-[3.6rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem]': larger,
    'font-sans': font === 'sans',
    'font-serif': font === 'serif',
  },
);
export const countdownDescriptionCenter = 'uppercase text-[1rem] sm:text-14 md:text-18 text-center';
export const countdownDescriptionBottom = 'font-semibold fluid-type-0 mt-17 text-center';
