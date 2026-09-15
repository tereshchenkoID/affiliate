'use client'

import { useTranslations } from 'next-intl'

import style from './index.module.scss'

const Footer = () => {
  const t = useTranslations()

  return (
    <footer className={style.block}>
      Footer
    </footer>
  )
}

export default Footer
