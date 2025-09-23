import { Grid } from '@/components/Grid';
import { LogoLockup } from '@/components/Logo';

// Force static rendering for optimal Netlify atomic deployment
export const dynamic = 'force-static';

// Cache for one year to align with atomic deployment strategy
export const revalidate = 31536000;

const Loading = () => {
  return (
    <div className="bg-white">
      <header className="cc border-t-[4rem] md:border-t-[1rem] border-t-cardinal-red shadow-md">
        <div className="flex max-md:h-[6.8rem] md:pt-70 md:pb-21 lg:pt-45 lg:pb-[7.1rem] text-21 sm:text-25 md:text-[3.2rem]">
          <LogoLockup text="Giving" />
        </div>
      </header>
      <main>
        <Grid gap="default" mt={10} mb={10} className="cc bg-white animate-[skeleton_2s_linear_infinite]">
          <div className="w-full h-300 bg-black-10" />
          <div className="w-full h-300 bg-black-10" />
        </Grid>
      </main>
    </div>
  );
};

export default Loading;
