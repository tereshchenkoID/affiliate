'use server'

import { cookies, headers } from 'next/headers'

import { redirect } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { checkRateLimit } from '@/app/lib/rateLimit'

const PROTECTED_PREFIXES = ['user/', 'profile/'] as const
const MUTATING_METHODS: readonly HttpMethod[] = ['POST', 'PUT', 'PATCH']
const BODY_METHODS: readonly HttpMethod[] = ['POST', 'PUT', 'PATCH', 'DELETE'] as const
const QUERY_METHODS: readonly HttpMethod[] = ['GET', 'DELETE'] as const
const DEFAULT_RATE_LIMIT = { max: 30, windowMs: 60_000 } as const

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiRequestOptions {
  method?: HttpMethod
  params?: Record<string, unknown>
  timeout?: number,
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

export interface ApiErrorResponse {
  code: string
  error_message: string
}

type AppHeaders = Awaited<ReturnType<typeof headers>>

const getClientIp = (headersList: AppHeaders): string | null => {
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return headersList.get('x-real-ip') || null
}

const buildQueryUrl = (url: URL, params: Record<string, unknown>): URL => {
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })

  return url
}

const buildFormData = (params: Record<string, unknown>): FormData => {
  const formData = new FormData()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value)
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, String(value))
    }
  })

  return formData
}

const applyRateLimit = (
  endpoint: string,
  clientIp: string | null
): ApiErrorResponse | null => {
  const { allowed, resetAt } = checkRateLimit(`${endpoint}:${clientIp || 'unknown'}`, DEFAULT_RATE_LIMIT)

  if (allowed) return null

  return {
    code: '3',
    error_message: `Too many attempts. Try again in ${Math.ceil((resetAt - Date.now()) / 1000)} sec.`,
  }
}

const isNextRedirectError = (error: unknown): boolean => {
  if (typeof error !== 'object' || error === null) return false

  if ('message' in error && error.message === 'NEXT_REDIRECT') return true
  if ('digest' in error && typeof error.digest === 'string') {
    return error.digest.startsWith('NEXT_REDIRECT')
  }

  return false
}

export const apiRequest = async <T = unknown>(
  endpoint: string,
  {
    method = 'GET',
    params = {},
    timeout = 15000,
    cache,
    next,
  }: ApiRequestOptions = {}
): Promise<T | ApiErrorResponse | null> => {
  const cookieStore = await cookies()
  const headersList = await headers()

  const token = cookieStore.get('NEXT_SID')?.value
  const locale = headersList.get('x-next-locale') || cookieStore.get('NEXT_LOCALE')?.value || routing.defaultLocale
  const ip = getClientIp(headersList)

  if ((MUTATING_METHODS as readonly string[]).includes(method)) {
    const rateLimitError = applyRateLimit(endpoint, ip)
    if (rateLimitError) return rateLimitError
  }

  const isProtected = PROTECTED_PREFIXES.some((prefix) => endpoint.startsWith(prefix))
  if (isProtected && !token) return null

  let url = new URL(`${process.env.API_BASE_URL}/${endpoint}`)

  const options: RequestInit = {
    method,
    cache: cache || 'no-store',
    ...(next ? { next } : { next: { revalidate: 0 } }),
    headers: {
      'Accept-Language': locale,
      ...(ip && { 'X-Forwarded-For': ip, 'X-Real-IP': ip }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    signal: AbortSignal.timeout(timeout),
  }

  const hasParams = Object.keys(params).length > 0

  if (QUERY_METHODS.includes(method) && hasParams) {
    url = buildQueryUrl(url, params)
  }

  if (BODY_METHODS.includes(method) && hasParams && method !== 'DELETE') {
    options.body = buildFormData(params)
  }

  try {
    const res = await fetch(url.toString(), options)
    const json = await res.json()

    if (json?.code === '2' || json?.code === '4') {
      redirect({
        href: {
          pathname: '/',
          query: { expired: '1' },
        },
        locale,
      })
    }

    return json as T
  } catch (error: unknown) {
    if (isNextRedirectError(error)) throw error

    if (error instanceof Error && error.name === 'TimeoutError') {
      return { code: '3', error_message: 'Request timeout' }
    }

    return { code: '3', error_message: 'Internal server error' }
  }
}
