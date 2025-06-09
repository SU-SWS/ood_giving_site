import React from 'react';
import { dcnb } from 'cnbuilder';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { slugify } from '../../../utilities/slugify';

export const MobileFilterHeader = ({
  heading, count, onClose, className,
}) => (
  <div className={dcnb('w-full xl:hidden', className)}>
    <div className="su-flex su-items-center su-px-58 su-h-75 su-w-full su-border-b su-border-b-black-30 su-bg-white">
      <button
        type="button"
        onClick={onClose}
        aria-label="Go back"
        className="su-absolute su-left-16 su-top-16 focus:!su-ring-lagunita-light !su-p-10"
      >
        <ArrowLeftIcon className="!su-w-22 !su-text-black-60 group-hocus:!su-text-lagunita-light" />
      </button>
      <div className="su-mx-auto">
        <h2
          id={`mobile-drawer-heading-${slugify(heading) || ''}`}
          className="su-mb-0 su-text-18 su-text-black-70 su-font-normal su-text-center"
        >
          {heading}
        </h2>
        {!!count && count > 0 && (
          <div className="su-text-center su-text-black-70">
            {`${count} selected`}
          </div>
        )}
      </div>
    </div>
  </div>
);
