import { Grid, type GridProps } from './Grid';

type ColumnGridProps = GridProps & {
  columnOneContent?: React.ReactNode;
  columnTwoContent?: React.ReactNode;
  columnThreeContent?: React.ReactNode;
  oneColumnMd?: boolean;
}

export const ColumnGrid = ({
  columnOneContent,
  columnTwoContent,
  columnThreeContent,
  oneColumnMd = false,
  ...props
}: ColumnGridProps) => {
  return (
    <Grid
      {...props}
      gap="card"
      md={oneColumnMd ? 1 : 3}
      lg={oneColumnMd ? 1 : 3}
    >
      {columnOneContent && <Grid gap="tile">{columnOneContent}</Grid>}
      {columnTwoContent && <Grid gap="tile">{columnTwoContent}</Grid>}
      {columnThreeContent && <Grid gap="tile">{columnThreeContent}</Grid>}
    </Grid>
  );
};
