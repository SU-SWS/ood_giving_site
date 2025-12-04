import { redirect } from 'next/navigation';
import { isEditorValid } from '@/utilities/isEditorValid';
import { logError } from '@/utilities/logger';

type EditorGuardProps = {
  children: React.ReactNode;
  searchParams: {
    '_storyblok_tk[space_id]'?: string;
    '_storyblok_tk[timestamp]'?: string;
    '_storyblok_tk[token]'?: string;
  };
};

/**
 * Server component that validates Storyblok editor access.
 * Replaces the middleware.ts logic for editor validation.
 */
export async function EditorGuard({ children, searchParams }: EditorGuardProps) {
  const accessToken = process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN ?? '';
  const spaceId = searchParams['_storyblok_tk[space_id]'] || '';
  const timestamp = searchParams['_storyblok_tk[timestamp]'] || '';
  const validationToken = searchParams['_storyblok_tk[token]'] || '';
  let isValid = false;

  try {
    isValid = await isEditorValid({
      accessToken,
      validationToken,
      spaceId,
      timestamp,
    });
  } catch (err) {
    logError('Editor validation failed', err, { pathname: '/editor' });
  }

  if (!isValid) {
    redirect('/404');
  }

  return <>{children}</>;
}
