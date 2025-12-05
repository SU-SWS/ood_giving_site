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
 * Server component that validates Storyblok editor access using signed token verification.
 *
 * This implements Storyblok's recommended security validation by:
 * 1. Verifying the SHA-1 signed token from Storyblok
 * 2. Ensuring the timestamp is within the last hour to prevent replay attacks
 * 3. Redirecting unauthorized access to 404
 *
 * Replaces the deprecated middleware.ts pattern for Next.js 16 compatibility.
 *
 * @see https://www.storyblok.com/faq/how-to-verify-the-preview-query-parameters-of-the-visual-editor
 */
export async function EditorGuard({ children, searchParams }: EditorGuardProps) {
  const accessToken = process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN ?? '';
  const spaceId = searchParams['_storyblok_tk[space_id]'] || '';
  const timestamp = searchParams['_storyblok_tk[timestamp]'] || '';
  const validationToken = searchParams['_storyblok_tk[token]'] || '';

  // Check if access token is configured
  if (!accessToken) {
    logError('Storyblok preview token not configured', new Error('STORYBLOK_PREVIEW_EDITOR_TOKEN missing'), {
      pathname: '/editor',
    });
    redirect('/404');
  }

  let isValid = false;

  try {
    isValid = await isEditorValid({
      accessToken,
      validationToken,
      spaceId,
      timestamp,
    });
  } catch (err) {
    logError('Editor validation failed - crypto error or invalid parameters', err, {
      pathname: '/editor',
      hasSpaceId: !!spaceId,
      hasTimestamp: !!timestamp,
      hasToken: !!validationToken,
    });
  }

  if (!isValid) {
    logError('Editor access denied - invalid or expired token', new Error('Unauthorized editor access'), {
      pathname: '/editor',
      spaceId,
    });
    redirect('/404');
  }

  return <>{children}</>;
}
