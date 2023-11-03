import React from 'react';

import UseWindowSize from '../../hooks/useWindowSize';

const pieColor = '#8C1515';
const pieBackgroundColor = 'rgba(93, 75, 60, 0.1)';
const pieWidth = '180px';

const CountdownPie = ({ children, className, descriptor, percent }) => {
  const { width } = UseWindowSize();
  const borderThickness = width <= 450 ? '10px' : '20px';

  return (
    <>
      <style>
        {`.${className} {width: ${pieWidth};}`}
        {`.${className}::before {background-image: radial-gradient(farthest-side,${pieColor} 98%,#0000), conic-gradient(${pieColor} calc(${percent}*1%),${pieBackgroundColor} 0); mask: radial-gradient(farthest-side,#0000 calc(99% - ${borderThickness}),#000 calc(100% - ${borderThickness})); -webkit-mask: radial-gradient(farthest-side,#0000 calc(99% - ${borderThickness}),#000 calc(100% - ${borderThickness}))}`}
        {`.${className}::after {background: ${pieColor}; inset: calc(50% - ${borderThickness}/2); transform: rotate(calc(${percent}*3.6deg)) translateY(calc(50% - ${pieWidth}/2))}`}
      </style>
      <div className={`countdown-pie ${className}`}>
        <span className="countdown-pie__number">{children}</span>
        <span className="countdown-pie__descriptor">{descriptor}</span>
      </div>
    </>
  );
};

export default CountdownPie;
