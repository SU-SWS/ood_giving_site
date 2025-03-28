interface FormattedDate {
  dateTime: string | null;
  year: string | null;
  monthShort: string | null;
  monthLong: string | null;
  day: string | null;
}

// Utility function to parse a date string and return a Date object
export const parseDate = (dateString: string): Date | null => {
  return dateString ? new Date(dateString) : null;
};

// Utility function to format a Date object using the US locale
export const formatDateUS = (dateObj: Date | null, options: Intl.DateTimeFormatOptions): string | null => {
  return dateObj ? dateObj.toLocaleDateString('en-US', options) : null;
};

// Function to format dates from Storyblok date picker without time
export const formatDate = (dateString: string): FormattedDate => {
  const dateObj = parseDate(dateString);

  // For use in the datetime attribute in the HTML time element
  const dateTime = dateString ? dateString.slice(0, 10) : null;

  const year = formatDateUS(dateObj, { year: 'numeric' });

  // 3-letter month
  const monthShort = formatDateUS(dateObj, { month: 'short' });

  // Full month name
  const monthLong = formatDateUS(dateObj, { month: 'long' });

  const day = formatDateUS(dateObj, { day: 'numeric' });

  return {
    dateTime,
    year,
    monthShort,
    monthLong,
    day,
  };
};
