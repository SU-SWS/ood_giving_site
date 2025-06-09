import React from 'react';
import { dcnb } from 'cnbuilder';
import { useClearRefinements } from 'react-instantsearch';

export const MobileFilterFooter = ({
  onCloseMenu,
  className,
  showClear = true,
}) => {
  const { canRefine, refine: clearRefinements } = useClearRefinements();

  const rootStyles = dcnb(
    'su-flex su-flex-wrap su-gap-8 su-justify-between su-w-full su-border-t su-border-t-black-30 su-bg-fog-light su-p-26 su-mt-8 su-z-10',
    className,
  );
  const clearButtonStyles = 'su-flex su-items-center su-px-16 su-py-10 su-rounded-md su-border-2 su-bg-white su-border-cardinal-red su-text-cardinal-red hover:su-bg-cardinal-red-light hover:su-text-white focus-visible:su-bg-cardinal-red-light focus-visible:su-text-white disabled:su-bg-black-10 disabled:su-text-black-80 disabled:su-border-black-20';
  const viewButtonStyles = dcnb(
    'su-flex su-items-center su-px-16 su-py-10 su-rounded-md su-border-2 su-border-digital-red su-bg-digital-red su-text-white hover:su-bg-cardinal-red-xdark focus:su-bg-cardinal-red-xdark',
    {
      'su-ml-auto': !showClear,
    },
  );

  return (
    <div className={rootStyles}>
      {showClear && (
        <button
          type="button"
          disabled={!canRefine}
          onClick={() => {
            clearRefinements();
          }}
          className={clearButtonStyles}
        >
          Clear all
        </button>
      )}
      <button type="button" onClick={onCloseMenu} className={viewButtonStyles}>
        View results
      </button>
    </div>
  );
};
