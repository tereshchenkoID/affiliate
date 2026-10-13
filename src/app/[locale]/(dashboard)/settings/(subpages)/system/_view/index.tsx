'use client'

import Box from '@/components/Layout/Box'
import Separator from '@/components/Overlay/Separator'

import Language from './Language'
import Timezone from './Timezone'
import Workspace from './Workspace'

import style from './index.module.scss'

import { SettingsProps } from '@/types/common'

const Section = ({ settings }: { settings: SettingsProps }) => {
  return (
    <Box
      as="section"
      display="grid"
      gap="4"
      className={style.block}
    >
      <Workspace />
      <Separator color="muted" />
      <Timezone settings={settings} />
      <Separator color="muted" />
      <Language settings={settings} />
    </Box>
  )
}

export default Section
