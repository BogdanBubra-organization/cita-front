import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(uk|en|es)/:path*'],
  matcher: ['/', '/(uk|en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
