'use client';

import { useMemo } from 'react';
import { FlexBox } from '@/components/FlexBox';
import * as styles from './CountdownPie.styles';
import { ClassValue, cnb } from 'cnbuilder';

const colorHexMap = {
  'cardinal-red': '#8c1515',
  'digital-red': '#b1040e',
  'bay-dark': '#417865',
};

export type CountdownPieProps = {
  filled: number;
  total?: number;
  showPercent?: boolean;
  fillColor?: keyof typeof colorHexMap;
  font?: 'sans' | 'serif';
  description?: string;
  descriptionPosition?: 'center' | 'bottom';
  shrink?: boolean;
  className?: ClassValue;
};

export const CountdownPie = ({
  filled = 0,
  total = 100,
  showPercent = false,
  fillColor = 'digital-red',
  font = 'sans',
  description,
  descriptionPosition = 'center',
  shrink = false,
  className,
}: CountdownPieProps) => {
  const isBlank = useMemo(() => !Number.isFinite(filled) || !Number.isFinite(total), [filled, total]);
  const percent = useMemo(() => (
    isBlank
      ? 0
      : Math.min(Math.floor((filled / total) * 100), 100)
  ), [isBlank, filled, total]);
  const fillColorHex = useMemo(() => colorHexMap[fillColor], [fillColor]);

  return (
    <FlexBox direction="col" className={cnb(className)}>
      <div className={styles.countdownPie}>
        <div
          className={styles.countdownRing({ shrink })}
          aria-hidden
          style={{
            background: `conic-gradient(${fillColorHex} calc(${percent} * 1%), rgba(93, 75, 60, 0.1) 0) border-box`,
            mask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
          }}
        />
        <FlexBox
          direction="col"
          alignItems="center"
          justifyContent="center"
          className={styles.countdownContent}
        >
          <FlexBox
            as="span"
            alignItems="center"
            justifyContent="center"
            className={styles.countdownNumber({ larger: descriptionPosition === 'bottom', font })}
          >
            {isBlank ? '-' : filled}{showPercent && '%'}
          </FlexBox>
          {!!description && descriptionPosition === 'center' && (
            <span className={styles.countdownDescriptionCenter}>{description}</span>
          )}
        </FlexBox>
      </div>
      {!!description && descriptionPosition === 'bottom' && (
        <div className={styles.countdownDescriptionBottom}>{description}</div>
      )}
    </FlexBox>
  );
};
