import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';
import { isEditorValid } from '@/utilities/isEditorValid';

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
  const { searchParams, pathname } = request.nextUrl;

  if (pathname !== '/editor') {
    return NextResponse.next();
  }

  const accessToken = process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN ?? '';
  const spaceId = searchParams.get('_storyblok_tk[space_id]') || '';
  const timestamp = searchParams.get('_storyblok_tk[timestamp]') || '';
  const validationToken = searchParams.get('_storyblok_tk[token]') || '';

  isEditorValid({
    accessToken,
    validationToken,
    spaceId,
    timestamp,
  }).then((isValid) => {
    if (!isValid) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    return NextResponse.next();
  }).catch(() => {
    return NextResponse.redirect(new URL('/404', request.url));
  });
};

export const config = {
  matcher: '/editor',
};
