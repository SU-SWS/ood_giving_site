import { type SbImageType } from '@/components/Storyblok/Storyblok.types';

/**
 * A utility function to get the first image from the story content.
 *
 * @param priorityFields - The priority fields to check for an image.
 * @param content - The content object to check for an image field
 *
 * @returns SbImageType | false - The first image found in the content object.
 */

export const getFirstImage = (priorityFields: string[], content: { [key:string]: unknown }): SbImageType | false => {
  if (!content || typeof content !== 'object') {
    throw new Error('Content object is required.');
  }

  // Check the priority fields for an image.
  for (const field of priorityFields) {
    if (content[field]) {
      return content[field];
    }
  }

  // Dig through the content object to find an image field.
  const image = findFirstAssetField(content);
  return image;
};

// Loop through the object and the nested arrays and objects to find an image field.
// An image field has the key 'fieldtype` and the value `asset`.
// It should also have an id that is an integer.
const findFirstAssetField = (obj: { [key:string]: unknown }): SbImageType | false => {
  // Check if the current object has the required fieldtype as 'asset'
  // and the id is an integer as the field could be empty.
  if (obj && obj.fieldtype === 'asset' && obj.id && typeof obj.id === 'number') {
    return obj;
  }

  // Iterate through the object keys to recursively search in nested objects or arrays
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const result = findFirstAssetField(obj[key] as { [key: string]: unknown });
        if (result) {
          return result;
        }
      }
    }
  }

  // Return false if no asset field is found
  return false;
};
