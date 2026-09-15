'use client'

import { useTranslations } from 'next-intl'

import style from './index.module.scss'

const Header = () => {
  const t = useTranslations()

  return (
    <header className={style.block}>
      {t('navigation.home')}
    </header>
  )
}

export default Header
