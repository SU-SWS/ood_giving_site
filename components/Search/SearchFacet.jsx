import React from 'react';
import { useInstantSearch, useRefinementList } from 'react-instantsearch';
import { Skeleton } from '@mui/material';
import { dcnb } from 'cnbuilder';
import { Heading } from '../simple/Heading';
import { slugify } from '../../utilities/slugify';

const SearchFacet = ({
  className, attribute, label, excludes = [],
}) => {
  const { items, refine } = useRefinementList({ attribute, limit: 100 });
  const { status } = useInstantSearch();
  const isLoading = status === 'loading';
  const isStalled = status === 'stalled';

  // Filter out any items we don't want to show.
  const filteredItems = items.filter((item) => !excludes.includes(item.value));
  // Sort the items alphabetically.
  filteredItems.sort((a, b) => a.value.localeCompare(b.value));

  // Show loading.
  if (isStalled) {
    return (
      <div>
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
        <Skeleton variant="text" className="su-my-3 su-w-full" height={35} />
      </div>
    );
  }

  // Nothing to show.
  if (!filteredItems.length) {
    return null;
  }

  // Render stuff.
  return (
    <div
      className={dcnb(
        'su-rs-mb-1 lg:su-rs-mb-3 su-rs-pb-3 lg:su-pb-0 su-border-b lg:su-border-0 su-border-black-20 su-relative',
        className,
        {
          'su-opacity-30': isLoading,
        },
      )}
    >
      <Heading
        level={3}
        size={1}
        weight="semibold"
        className="su-leading-display"
        id={`${attribute}-heading`}
      >
        {label}
      </Heading>
      <ul
        className="su-list-none su-m-0 su-p-0"
        aria-labelledby={`${attribute}-heading`}
      >
        {filteredItems.map((option, index) => (
          <li key={`${attribute}-${slugify(option.value)}`}>
            <label
              className={`su-label su-flex su-items-center su-cursor-pointer su-text-19 hover:su-text-digital-red-xlight
              ${index ? 'su-mt-20' : ''}`}
              htmlFor={`${attribute}-${slugify(option.value)}`}
            >
              <input
                type="checkbox"
                value={option.value}
                name={`${attribute}-${slugify(option.value)}`}
                id={`${attribute}-${slugify(option.value)}`}
                data-test={`${attribute}-${slugify(option.value)}`}
                checked={option.isRefined}
                className="su-peer su-form-checkbox su-text-digital-red-light su-mr-10 su-w-15 su-h-15 su-cursor-pointer su-rounded su-border-black-60 hocus:su-border-none hocus:su-ring hocus:su-ring-digital-red-light hocus:su-ring-offset-0"
                onChange={(_e) => {
                  refine(option.value);
                }}
              />
              <span className="su-text-16 lg:su-text-19 peer-hover:su-text-digital-red-light peer-focus:su-text-digital-red-light peer-hover:su-underline peer-focus:su-underline hover:su-underline hover:su-text-digital-red-light su-capitalize">
                {option.label}
                <span> ({option.count.toLocaleString('en-us')})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFacet;
