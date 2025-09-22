import { cnb } from 'cnbuilder';

export const countdown = ({ hasDays = false }: { hasDays?: boolean } = {}) => cnb(
  'mx-auto w-full',
  {
    'max-w-[54rem] gap-4': !hasDays,
    'max-w-[36rem] md:max-w-[72rem] gap-x-22 gap-y-10 md:gap-x-4 md:gap-y-4': hasDays,
  },
);
