import { getCountries, getSettings } from '@/app/actions/static'

import Section from './_view'

export default async function System() {
  const [
    settings,
    countries,
  ] = await Promise.all([
    getSettings(),
    getCountries()
  ])

  return (
    <Section
      countries={countries}
      settings={settings}
    />
  )
}
