'use client'

import { useTranslations } from 'next-intl'

import Box from '@/components/Layout/Box'
import Grid from '@/components/Layout/Grid'
import Separator from '@/components/Overlay/Separator'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'

import Language from './Language'
import Timezone from './Timezone'
import Workspace from './Workspace'

import style from './index.module.scss'

import { SettingsProps } from '@/types/common'

const Section = ({ settings }: { settings: SettingsProps }) => {
  const t = useTranslations()

  return (
    <Box
      as="section"
      display="grid"
      gap="4"
      p="4"
      className={style.block}
    >
      <Grid columns="1.5fr 3fr" gap="6">
        <Box>
          <Heading as="h4" size="4">Workspace setup</Heading>
          <Text size="3" color="gray">Update your workspace name and website address used across the platform.</Text>
        </Box>
        <Workspace />
      </Grid>

      <Separator color="muted" />

      <Grid columns="1.5fr 3fr" gap="6">
        <Box>
          <Heading as="h4" size="4">Default timezone</Heading>
          <Text size="3" color="gray">Set the default time zone used for shared dates and system actions.</Text>
        </Box>
        <Timezone settings={settings} />
      </Grid>

      <Separator color="muted" />

      <Grid columns="1.5fr 3fr" gap="6">
        <Box>
          <Heading as="h4" size="4">Language</Heading>
          <Text size="3" color="gray">Choose the default language used across the workspace and affiliate registration.</Text>
        </Box>
        <Language settings={settings} />
      </Grid>
    </Box>
  )
}

export default Section
