import { apiRequest } from '@/app/actions/api'
import { getSettings } from '@/app/actions/static'

import Section from './_view'

export default async function System() {
  const [
    settings,
    currencies,
  ] = await Promise.all([
    getSettings(),
    apiRequest('currencies')
  ])

  return (
    <Section
      settings={settings}
      currencies={currencies}
    />
  )
}
