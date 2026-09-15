'use server'

import { cookies } from 'next/headers'

import { ApiErrorResponse, apiRequest } from '@/app/actions/api'

interface AuthResponse {
  token?: string
  [key: string]: unknown
}

const hasToken = (data: unknown): data is { token: string } => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'token' in data &&
    typeof (data as Record<string, unknown>).token === 'string'
  )
}

const saveSession = async (token: string | null): Promise<void> => {
  if (!token) return

  const cookieStore = await cookies()
  cookieStore.set('NEXT_SID', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })
}

export const registerWithCredentialsAction = async (
  filterData: Record<string, unknown>,
): Promise<AuthResponse | ApiErrorResponse | null> => {
  const data = await apiRequest<AuthResponse>('sign-up/', {
    method: 'POST',
    params: {
      data: JSON.stringify(filterData)
    },
  })

  if (hasToken(data)) {
    await saveSession(data.token)
  }

  return data
}

export const loginWithCredentialsAction = async (
  username: string,
  password: string
): Promise<AuthResponse | ApiErrorResponse | null> => {
  const data = await apiRequest<AuthResponse>('sign-in/', {
    method: 'POST',
    params: { username, password },
  })

  if (hasToken(data)) {
    await saveSession(data.token)
  }

  return data
}

export const logoutAction = async (): Promise<{ success: boolean }> => {
  await apiRequest('logout/', { method: 'GET' }).catch(() => {})

  const cookieStore = await cookies()
  cookieStore.delete('NEXT_SID')
  return { success: true }
}
