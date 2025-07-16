'use client';

import { useMemo } from 'react';
import { FlexBox } from '@/components/FlexBox';
import * as styles from './Countdown.styles';

export type CountdownPieProps = {
  filled: number;
  total: number;
  description?: string;
};

export const CountdownPie = ({ filled, total, description }: CountdownPieProps) => {
  const isBlank = useMemo(() => Number.isNaN(filled) || Number.isNaN(total), [filled, total]);
  const percent = useMemo(() => (
    isBlank
      ? 0
      : Math.min(Math.floor((filled / total) * 100), 100)
  ), [isBlank, filled, total]);

  return (
    <div className={styles.countdownPie}>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        className={styles.countdownRing}
        style={{
          background: `#eeedeb conic-gradient(#8C1515 calc(${percent} * 1%), transparent 0)`,
        }}
      >
        <FlexBox
          direction="col"
          alignItems="center"
          justifyContent="center"
          className={styles.countdownContent}
        >
          <span className={styles.countdownNumber}>{isBlank ? '-' : filled}</span>
          {!!description && (
            <span className={styles.countdownDescription}>{description}</span>
          )}
        </FlexBox>
      </FlexBox>
    </div>
  );
};
