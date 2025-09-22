import { Grid, type GridProps } from './Grid';

type ColumnGridProps = GridProps & {
  columnOneContent?: React.ReactNode;
  columnTwoContent?: React.ReactNode;
  columnThreeContent?: React.ReactNode;
  oneColumnMd?: boolean;
  isNotStretched?: boolean;
}

export const ColumnGrid = ({
  columnOneContent,
  columnTwoContent,
  columnThreeContent,
  oneColumnMd,
  isNotStretched,
  ...props
}: ColumnGridProps) => {
  return (
    <Grid
      {...props}
      gap="card"
      md={oneColumnMd ? 1 : 3}
      lg={3}
      alignItems={isNotStretched ? 'start' : 'stretch'}
    >
      {columnOneContent && <Grid gap="tile">{columnOneContent}</Grid>}
      {columnTwoContent && <Grid gap="tile">{columnTwoContent}</Grid>}
      {columnThreeContent && <Grid gap="tile">{columnThreeContent}</Grid>}
    </Grid>
  );
};
