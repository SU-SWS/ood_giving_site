import { cnb } from 'cnbuilder';
import { FlexBox } from '@/components/FlexBox';
import * as styles from './Cta.styles';
import * as types from './Cta.types';

type CtaGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  display: types.CtaGroupDisplayType;
};

export const CtaGroup = ({
  display = 'inline-block',
  className,
  children,
  ...props
}: CtaGroupProps) => {
  return (
    <FlexBox
      {...props}
      as="ul"
      mb="1em" // Gatsby build adds a 1em margin-bottom to each cta inside a CTA group
      direction={display === 'inline-block' ? 'row' : 'col'}
      wrap={display === 'inline-block' ? 'wrap' : 'nowrap'}
      justifyContent={display === 'inline-block' ? 'center' : 'start'}
      className={cnb(styles.ctaGroup, className)}
    >
      {children}
    </FlexBox>
  );
};
