import { NextResponse, type NextRequest } from 'next/server';
import { isEditorValid } from '@/utilities/validateAccessToken';
import '@/utilities/envConfig';

export const middleware = (request: NextRequest) => {
  const { searchParams, pathname } = request.nextUrl;

  if (pathname !== '/editor') {
    return NextResponse.next();
  }

  const accessToken = process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN || '';
  const spaceId = searchParams.get('_storyblok_tk[space_id]') || '';
  const timestamp = searchParams.get('_storyblok_tk[timestamp]') || '';
  const validationToken = searchParams.get('_storyblok_tk[token]') || '';
  const isValid = isEditorValid({
    accessToken,
    validationToken,
    spaceId,
    timestamp,
  });

  console.log({
    accessToken,
    spaceId,
    timestamp,
    validationToken,
    isValid,
  });

  if (!isValid) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/editor',
};
