import { Grid, type GridProps } from '@/components/Grid';
import { type MarginType } from '@/utilities/datasource';
import * as styles from './Row.styles';

type RowThreeColumnProps = GridProps & {
  columnOneContent?: React.ReactNode;
  columnTwoContent?: React.ReactNode;
  columnThreeContent?: React.ReactNode;
  // If true, have all content stacked vertically at MD breakpoint
  oneColumnMd?: boolean;
  // Vertical alignment of content in each column
  contentAlignment?: 'start' | 'center' | 'end' | 'stretch';
  // Horizontal alignment of the whole row if rowWidth is not 'full'
  align?: 'left' | 'right' | 'center';
  mb?: MarginType;
}

export const RowThreeColumns = ({
  columnOneContent,
  columnTwoContent,
  columnThreeContent,
  oneColumnMd,
  contentAlignment = 'start',
  align = 'center',
  mb,
  ...props
}: RowThreeColumnProps) => {
  return (
    <Grid
      gap="default"
      md={oneColumnMd ? undefined : 3}
      lg={oneColumnMd ? 3 : undefined}
      mb={mb}
      alignItems={contentAlignment}
      className={styles.root(contentAlignment)}
      {...props}
    >
      <div>
        {columnOneContent}
      </div>
      <div>
        {columnTwoContent}
      </div>
      <div>
        {columnThreeContent}
      </div>
    </Grid>
  );
};
