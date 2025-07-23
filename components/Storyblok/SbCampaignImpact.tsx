import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CountdownPie } from '../CountdownPie';
import { FlexBox } from '../FlexBox';

export type SbCampaignImpactColorsType = 'digital-red' | 'bay-dark';

export type SbCampaignImpactItem = {
  _uid: string;
  percent?: string;
  description?: string;
  graph_line_color?: SbCampaignImpactColorsType;
}

export type SbCampaignImpactProps = {
  blok: SbBlokData & {
    items?: SbCampaignImpactItem[];
  };
};

export const SbCampaignImpact = ({ blok }: SbCampaignImpactProps) => {
  const { items } = blok;

  if (!items?.length) {
    return null;
  }

  return (
    <FlexBox
      {...storyblokEditable(blok)}
      alignItems="start"
      justifyContent="evenly"
      className="pt-20 pb-20 md:pb-30 gap-y-40"
      wrap="wrap"
    >
      {items.map(({
        _uid,
        percent,
        description,
        graph_line_color: lineColor,
      }) => {

        return (
          <div key={_uid} className="flex w-full md:w-1/2 lg:w-1/4 px-8 lg:px-15 justify-center">
            <CountdownPie
              showPercent
              filled={parseInt(percent, 10) || 0}
              description={description}
              descriptionPosition="bottom"
              fillColor={lineColor}
              font="serif"
              className="w-[20rem] lg:w-[25rem]"
            />
          </div>
        );
      })}
    </FlexBox>
  );
};
