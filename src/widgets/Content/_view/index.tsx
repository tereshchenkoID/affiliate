'use client'

import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import Menu from './Menu'

import style from './index.module.scss'

const Section = ({ children }: { children: ReactNode }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <Menu />
      <div>
        {children}
      </div>
    </div>
  )
}

export default Section
