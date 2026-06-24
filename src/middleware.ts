import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request) {
  const cfmMatch = request.nextUrl.pathname.match(/^\/cfm\/([^/]+)\/?$/)

  if (cfmMatch) {
    const url = request.nextUrl.clone()
    url.pathname = `/uk/confirmation/${cfmMatch[1]}`

    return NextResponse.rewrite(url)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(uk|en|es)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
