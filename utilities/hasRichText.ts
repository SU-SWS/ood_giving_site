import { render, type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

/**
 * Returns a boolean if the Storyblok rich text field (wysiwyg) has any content.
 *
 * @param {StoryblokRichtext} wysiwyg - The wysiwyg to check for content.
 * @returns {boolean} - Whether or not the wysiwyg has content.
 */

export const hasRichText = (wysiwyg: StoryblokRichtext): boolean => !!render(wysiwyg);
