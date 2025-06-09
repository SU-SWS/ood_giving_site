import { Grid } from '@/components/Grid';
import { Masthead } from '@/components/Masthead';

const Loading = () => {
  return (
    <div className="bg-white">
      <Masthead />
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
