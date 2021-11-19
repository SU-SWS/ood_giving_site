import React from 'react';

const Heading = (props) => {
  const HeadingTag = props.level || props.defaultLevel || 'h3';

  return (
    <HeadingTag
      className={`
                ${props.classes ? props.classes : ''}
                ${props.serif ? 'su-serif' : ''}
                ${props.weight ? `su-${props.weight}` : ''}
                ${props.color ? `su-text-${props.color}` : ''}
                ${props.align ? `su-text-align-${props.align}` : ''}
                ${props.external ? 'su-link--external' : ''}
    `}
    >
      {props.children}
    </HeadingTag>
  );
};

export default Heading;
