import { cnb } from 'cnbuilder';

export const countdown = ({ hasDays = false }: { hasDays?: boolean } = {}) => cnb(
  'mx-auto w-full',
  {
    'max-w-[54rem] gap-4': !hasDays,
    'max-w-[36rem] md:max-w-[72rem] gap-x-22 gap-y-10 md:gap-x-4 md:gap-y-4': hasDays,
  },
);

export const countdownPie = 'h-[min-content]';
export const countdownRing = 'rounded-full aspect-[1/1]';
export const countdownContent = 'bg-white p-12 m-14 sm:m-20 rounded-full aspect-[1/1] w-full';
export const countdownNumber = 'text-[clamp(2rem,8vw,6rem)] md:text-[6rem] font-bold aspect-[1/1] text-center';
export const countdownDescription = 'uppercase text-[clamp(1rem,3vw,1.8rem)] md:text-18';
