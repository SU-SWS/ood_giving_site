import { Grid, type GridProps } from '@/components/Grid';
import * as styles from './Row.styles';

type RowThreeColumnProps = GridProps & {
  columnOneContent?: React.ReactNode;
  columnTwoContent?: React.ReactNode;
  columnThreeContent?: React.ReactNode;
  // If true, have all content stacked vertically at MD breakpoint
  oneColumnMd?: boolean;
  // Vertical alignment of content in each column
  contentAlignment?: 'start' | 'center' | 'end' | 'stretch';
}

export const RowThreeColumns = ({
  columnOneContent,
  columnTwoContent,
  columnThreeContent,
  oneColumnMd,
  contentAlignment = 'start',
  pb,
  ...props
}: RowThreeColumnProps) => {
  return (
    <Grid
      gap="card"
      md={oneColumnMd ? undefined : 3}
      lg={oneColumnMd ? 3 : undefined}
      pb={pb}
      alignItems={contentAlignment}
      className={styles.root(contentAlignment)}
      {...props}
    >
      <div>{columnOneContent}</div>
      <div>{columnTwoContent}</div>
      <div>{columnThreeContent}</div>
    </Grid>
  );
};
