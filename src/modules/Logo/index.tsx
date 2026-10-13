import { useMemo } from 'react'

import { Link } from '@/i18n/navigation'

import { DASHBOARD } from '@/constant'

import { useUser } from '@/hooks/useUser'

import style from './index.module.scss'

const Logo = () => {
  const { user } = useUser()

  const { prefix, badge } = useMemo(() => {
    const rawName = user?.workspace?.name?.trim()

    if (!rawName) {
      return { prefix: 'W', badge: 'S' }
    }

    const initials = rawName
      .split(/\s+/)
      .filter(Boolean)
      .map((word: string) => word[0].toUpperCase())

    const prefix = initials[0] || ''

    const badge = initials.length > 1
      ? initials.slice(1, 5).join('')
      : rawName.slice(1, 4).toUpperCase()

    return { prefix, badge }
  }, [user?.workspace?.name])

  return (
    <Link
      href={{
        pathname: DASHBOARD.home.url,
      }}
      className={style.block}
    >
      <span className={style.left}>{prefix}</span>
      <span className={style.right}>{badge}</span>
    </Link>
  )
}

export default Logo
