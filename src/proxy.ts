// import { NextRequest, NextResponse } from 'next/server'
// import createMiddleware from 'next-intl/middleware'
//
// import { routing } from '@/i18n/routing'
//
// const handleI18nRouting = createMiddleware(routing)
//
// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl
//
//   if (pathname.includes('.') || pathname.startsWith('/_next')) {
//     return NextResponse.next()
//   }
//
//   const response = handleI18nRouting(request)
//
//   if (response.status >= 300 && response.status < 400) {
//     return response
//   }
//
//   const locale = response.headers.get('x-middleware-request-x-next-intl-locale') || routing.defaultLocale
//   const pathnameWithoutLocale = pathname.replace(new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`), '') || '/'
//
//   const hasToken = false
//   // const hasToken = request.cookies.has('NEXT_SID')
//   const isLoginPage = pathnameWithoutLocale === '/sign-in'
//
//   // Нет токена, но лезет на сайт -> на логин
//   if (!hasToken && !isLoginPage) {
//     return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url))
//   }
//
//   // Есть токен, но сидит на логине -> на главную
//   if (hasToken && isLoginPage) {
//     return NextResponse.redirect(new URL(`/${locale}`, request.url))
//   }
//
//   response.headers.set('x-next-locale', locale)
//   return response
// }
//
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|manifest.json|.*\\..*).*)',
//   ],
// }




import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

const handleI18nRouting = createMiddleware(routing)

const AUTH_PATHS = ['/sign-in', '/sign-up', '/forgot-password'] as const

const PUBLIC_PATHS = [] as const

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  const response = handleI18nRouting(request)

  if (response.status >= 300 && response.status < 400) {
    return response
  }

  const locale = response.headers.get('x-middleware-request-x-next-intl-locale') || routing.defaultLocale
  const pathnameWithoutLocale = pathname.replace(new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`), '') || '/'

  // const hasToken = request.cookies.has('NEXT_SID')

  const hasToken = false

  const isAuthPath = AUTH_PATHS.some((path) => pathnameWithoutLocale.startsWith(path))
  const isPublicPath = PUBLIC_PATHS.some((path) => pathnameWithoutLocale.startsWith(path))

  if (isPublicPath) {
    response.headers.set('x-next-locale', locale)
    return response
  }

  if (hasToken && isAuthPath) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  if (!hasToken && !isAuthPath) {
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url))
  }

  response.headers.set('x-next-locale', locale)
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|manifest.json|.*\\..*).*)',
  ],
}
