import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // BDB Labs migrations
  if (pathname === '/research') {
    url.pathname = '/bdb-labs/research';
    return NextResponse.redirect(url);
  }
  if (pathname === '/publications') {
    url.pathname = '/bdb-labs/publications';
    return NextResponse.redirect(url);
  }
  if (pathname === '/repository') {
    url.pathname = '/bdb-labs/repository';
    return NextResponse.redirect(url);
  }

  // BPV migrations
  if (pathname === '/advisory') {
    url.pathname = '/bpv/advisory';
    return NextResponse.redirect(url);
  }
  if (pathname === '/case-studies') {
    url.pathname = '/bpv/case-studies';
    return NextResponse.redirect(url);
  }

  // Writing migration
  if (pathname.startsWith('/writing')) {
    if (pathname === '/writing') {
      url.pathname = '/insights';
    } else {
      url.pathname = `/insights${pathname.replace('/writing', '')}`;
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/research',
    '/publications',
    '/repository',
    '/advisory',
    '/case-studies',
    '/writing',
    '/writing/:path*',
  ],
};
