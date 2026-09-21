import { getCachedUser, getSettings } from '@/app/actions/static'

import Section from './_view'

export default async function HeaderLayout() {
  const [
    settings,
    user,
  ] = await Promise.all([
    getSettings(),
    getCachedUser()
  ])

  return (
    <Section
      settings={settings}
      user={user}
    />
  )
}
