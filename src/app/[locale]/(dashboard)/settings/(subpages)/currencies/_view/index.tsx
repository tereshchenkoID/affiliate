'use client'

import Box from '@/components/Layout/Box'

import Currencies from './Currencies'
import Exchange from './Exchange'

import style from './index.module.scss'

import { ApiProps, SettingsProps } from '@/types/common'

const Section = ({ settings, currencies }: { settings: SettingsProps, currencies: ApiProps }) => {
  return (
    <Box
      as="section"
      display="grid"
      gap="4"
      className={style.block}
    >
      <Currencies currencies={currencies} />
      <Exchange settings={settings} />
    </Box>
  )
}

export default Section
