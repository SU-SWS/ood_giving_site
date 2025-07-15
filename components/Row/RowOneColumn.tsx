import { cnb } from 'cnbuilder';
import { Container, type ContainerProps } from '@/components/Container';
import * as styles from './Row.styles';

type RowOneColumnProps = ContainerProps & {
  rowWidth?: styles.RowOneColumnWidthType;
  // Horizontal alignment of the whole row if rowWidth is not 'full'
  align?: styles.RowOneColumnAlignType;
};

export const RowOneColumn = ({
  rowWidth = 'flex-lg-10-of-12 flex-xl-8-of-12',
  align = 'su-mx-auto',
  mb,
  children,
  ...props
}: RowOneColumnProps) => {
  return (
    <Container
      mb={mb}
      className={cnb(styles.rowOneColumnWidths[rowWidth], styles.rowOneColumnAligns[align])}
      {...props}
    >
      {children}
    </Container>
  );
};
