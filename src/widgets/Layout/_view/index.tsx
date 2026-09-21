'use client'

import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import style from './index.module.scss'

const Section = ({ children }: { children: ReactNode }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      {children}
    </div>
  )
}

export default Section
