import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CountdownPie } from '../CountdownPie';
import { Grid } from '../Grid';

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
    <Grid
      {...storyblokEditable(blok)}
      md={2}
      xl={4}
      alignItems="center"
      justifyItems="center"
      className="gap-50 grow-0"
    >
      {items.map(({
        _uid,
        percent,
        description,
        graph_line_color: lineColor,
      }) => {

        return (
          <CountdownPie
            key={_uid}
            showPercent
            filled={parseInt(percent, 10) || 0}
            description={description}
            descriptionPosition="bottom"
            fillColor={lineColor}
            font="serif"
            className="max-w-200 lg:max-w-250"
          />
        );
      })}
    </Grid>
  );
};
