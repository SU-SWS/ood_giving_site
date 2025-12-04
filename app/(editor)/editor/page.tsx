import { EditorGuard } from './EditorGuard';
import EditorClient from './EditorClient';

/**
 * Server component that validates access before rendering the editor.
 * Moved validation from middleware.ts for Next.js 16 compatibility.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    path?: string;
    '_storyblok_tk[space_id]'?: string;
    '_storyblok_tk[timestamp]'?: string;
    '_storyblok_tk[token]'?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <EditorGuard searchParams={params}>
      <EditorClient />
    </EditorGuard>
  );
}
