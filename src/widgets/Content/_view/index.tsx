'use client'

import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import Box from '@/components/Layout/Box'
import Breadcrumbs from '@/components/Overlay/Breadcrumbs'

import Menu from './Menu'

import style from './index.module.scss'

const Section = ({ children }: { children: ReactNode }) => {
  const t = useTranslations()

  return (
    <div className={style.block}>
      <Menu />
      <div className={style.content}>
        <Box p="4" className={style.header}>
          <Breadcrumbs />
        </Box>
        <Box p="4" className={style.body}>
          {children}
        </Box>
      </div>
    </div>
  )
}

export default Section
