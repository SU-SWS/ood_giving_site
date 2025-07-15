'use client';

import { useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { FlexBox } from '@/components/FlexBox';

export type CountdownPieProps = {
  filled: number;
  total: number;
  descriptor?: string;
};

export const CountdownPie = ({ filled, total, descriptor }: CountdownPieProps) => {
  const { width } = useWindowSize();
  const percent = useMemo(() => Math.min(Math.floor(filled / total), 100), [filled, total]);

  return (
    <div
      className="flex items-center justify-center"
      style={{
        background: `conic-gradient(hotpink calc(${percent} * 1%), transparent 0)`,
      }}
    >
      <FlexBox direction="col" alignItems="center" justifyContent="center" className="bg-white p-8">
        <span className="text-[4rem] font-bold">{filled}</span>
        {!!descriptor && (
          <span className="uppercase">{descriptor}</span>
        )}
      </FlexBox>
    </div>
  );
};
