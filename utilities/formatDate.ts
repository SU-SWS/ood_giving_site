interface FormattedDate {
  dateTime?: string;
  year?: string;
  monthShort?: string;
  monthLong?: string;
  day?: string;
  weekday?: string;
}

const US_FORMATTERS = {
  year: new Intl.DateTimeFormat('en-US', { year: 'numeric' }),
  monthShort: new Intl.DateTimeFormat('en-US', { month: 'short' }),
  monthLong: new Intl.DateTimeFormat('en-US', { month: 'long' }),
  day: new Intl.DateTimeFormat('en-US', { day: 'numeric' }),
  weekday: new Intl.DateTimeFormat('en-US', { weekday: 'long' }),
} as const;

// Format dates from Storyblok date picker without time
export const formatDate = (dateString: string): FormattedDate | null => {
  if (!dateString) {
    return null;
  }

  const dateObj = new Date(dateString);

  // Return null if date is invalid
  if (isNaN(dateObj.getTime())) {
    return null;
  }

  // For use in the datetime attribute in the HTML time element
  const dateTime = dateString.slice(0, 10);

  return {
    dateTime,
    year: US_FORMATTERS.year.format(dateObj),
    monthShort: US_FORMATTERS.monthShort.format(dateObj),
    monthLong: US_FORMATTERS.monthLong.format(dateObj),
    day: US_FORMATTERS.day.format(dateObj),
    weekday: US_FORMATTERS.weekday.format(dateObj),
  };
};
