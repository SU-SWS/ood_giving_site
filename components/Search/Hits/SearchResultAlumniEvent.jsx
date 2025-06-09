/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import sanitize from 'sanitize-html';
import { useLocation } from '@reach/router';
import { DateTime } from 'luxon';
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { dcnb } from 'cnbuilder';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { utmParams } from '../../../utilities/utmParams';
import { checkUTMParams } from '../../../utilities/checkUTMParams';
import { SrOnlyText } from '../../accessibility/SrOnlyText';

/**
 * Alumni Event {Hit}
 * @param {*} result
 * @returns
 */
const SearchResultAlumniEvent = ({ result, className }) => {
  const routerLocation = useLocation();
  const utms = utmParams(routerLocation.search);

  const {
    objectID,
    domain,
    url,
    title,
    start,
    end,
    timeZone,
    location,
    city,
    country,
  } = result;

  // Format the location string.
  // The format should be "location, city, country"
  const formattedLocation = () => {
    const locationArray = [location, city, country];
    return locationArray.filter((loc) => loc).join(', ');
  };

  // Time of events.
  const startTime = DateTime.fromISO(start).setZone(timeZone);
  const endTime = DateTime.fromISO(end).setZone(timeZone);
  // Format a date and time span string between start and end times in the formats of
  // If the start and end date and times are the same use this format
  // "Friday, October 8, 2021 8:00 AM PDT"
  // If the start and end date are the same but the times are different use this format
  // "Friday, October 8, 2021 8:00 AM - 10:00 AM PDT"
  // If the start and end date are different use this format
  // "October 8, 2021 8:00 AM - October 9, 2021 10:00 AM PDT"
  const formattedDateTimeSpan = () => {
    if (startTime.hasSame(endTime, 'day')) {
      if (startTime.hasSame(endTime, 'minute')) {
        return `${startTime.toFormat('EEEE, LLLL d, yyyy h:mm a ZZZZ')}`;
      }
      return `${startTime.toFormat(
        'EEEE, LLLL d, yyyy h:mm a ZZZZ',
      )} - ${endTime.toFormat('h:mm a ZZZZ')}`;
    }
    return `${startTime.toFormat('LLLL d, yyyy h:mm a')} - ${endTime.toFormat(
      'LLLL d, yyyy h:mm a ZZZZ',
    )}`;
  };

  return (
    <div
      key={objectID}
      className={dcnb(
        'su-px-0 su-rs-py-2 md:su-rs-px-2 su-border-b su-border-black-40',
        className,
      )}
    >
      <div className="su-flex su-flex-wrap md:su-flex-nowrap">
        <div className="md:su-flex-1 su-w-full su-flex su-flex-col">
          <Heading level={3} size={1} font="serif">
            <a
              className="su-text-digital-red-light su-group su-transition-colors hocus:su-underline"
              href={checkUTMParams(url, utms)}
            >
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  // eslint-disable-next-line no-underscore-dangle
                  __html: sanitize(title, {
                    decodeEntities: false,
                  }),
                }}
              />
              <HeroIcon
                iconType={
                  domain.match(/^alumni.stanford.edu/)
                    ? 'arrow-right'
                    : 'external'
                }
                className="su-inline-block group-hocus:su-text-cardinal-red"
                isAnimate
                srText={
                  domain.match(/^alumni.stanford.edu/) ? '' : ' (external link)'
                }
              />
            </a>
          </Heading>
          <div className="su-text-16 su-mb-10 su-order-first">{domain}</div>
          {start && end && (
            <p className="su-card-paragraph su-leading-snug su-mb-0">
              <SrOnlyText>When:</SrOnlyText>{' '}
              <CalendarIcon
                className="su-inline-block su-shrink-0 su-mr-06em su-w-1em"
                aria-hidden="true"
              />
              {formattedDateTimeSpan()}{' '}
            </p>
          )}

          <p className="su-card-paragraph su-leading-snug">
            <SrOnlyText>Where:</SrOnlyText>
            <LocationMarkerIcon
              className="su-inline-block su-shrink-0 su-mr-06em su-w-1em"
              aria-hidden="true"
            />

            {formattedLocation()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchResultAlumniEvent;
