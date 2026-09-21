import { getSettings } from '@/app/actions/static'

import Section from './_view'

export default async function System() {
  const settings = await getSettings()

  return (
    <Section settings={settings} />
  )
}
