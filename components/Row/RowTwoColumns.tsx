import { cnb } from 'cnbuilder';
import { Grid, type GridProps } from '@/components/Grid';
import * as styles from './Row.styles';

type RowTwoColumnProps = GridProps & {
  columnOneContent?: React.ReactNode;
  columnTwoContent?: React.ReactNode;
  rowWidth?: styles.RowTwoColumnWidthType;
  widthRatio?: styles.WidthRatioType;
  // If true, have all content stacked vertically at MD breakpoint
  oneColumnMd?: boolean;
  // Vertical alignment of content in each column
  contentAlignment?: 'start' | 'center' | 'end' | 'stretch';
  // Horizontal alignment of the whole row if rowWidth is not 'full'
  align?: styles.RowAlignType;
}

export const RowTwoColumns = ({
  columnOneContent,
  columnTwoContent,
  rowWidth = 'full',
  widthRatio = '1-to-1',
  oneColumnMd,
  contentAlignment = 'start',
  align = 'su-mx-auto',
  pb,
  ...props
}: RowTwoColumnProps) => {
  return (
    <Grid
      gap="card"
      md={oneColumnMd ? undefined : 6}
      lg={oneColumnMd ? 6 : undefined}
      pb={pb}
      alignItems={contentAlignment}
      className={cnb(styles.root(contentAlignment), styles.rowTwoColumnWidths[rowWidth], styles.rowAligns[align])}
      {...props}
    >
      <div className={styles.colOne(widthRatio, oneColumnMd)}>
        {columnOneContent}
      </div>
      <div className={styles.colTwo(widthRatio, oneColumnMd)}>
        {columnTwoContent}
      </div>
    </Grid>
  );
};
