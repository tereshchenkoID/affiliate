'use server'

import { cache } from 'react'

import { apiRequest } from '@/app/actions/api'

export const getSettings = cache(async () => {
  return apiRequest('settings', {
    cache: 'force-cache',
    next: {
      revalidate: 3600,
      tags: ['settings']
    },
  })
})

export const getCachedUser = cache(async () => {
  return await apiRequest('auth', {
    method: 'GET',
  })
})
