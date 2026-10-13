'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import Action from '@/components/Form/Action'
import Box from '@/components/Layout/Box'
import Icon from '@/components/Overlay/Icon'
import Tooltip from '@/components/Typography/Tooltip'
import Logo from '@/modules/Logo'

import Account from './Account'

import style from './index.module.scss'

import { SettingsProps } from '@/types/common'

const Section = ({ settings }: { settings: SettingsProps }) => {
  const t = useTranslations()
  const [account, setAccount] = useState<boolean>(false)

  return (
    <header className={style.block}>
      <Logo />
      <Box
        display="flex"
        gap="2"
      >
        <Action
          size="2"
          color="primary"
        >
          <Icon name="store" size="16" />
          Find Affiliates
        </Action>
        <Tooltip content={'Extras'}>
          <Action
            size="2"
            color="transparent"
            square
            aria-label="Extras"
          >
            <Icon name="layout-grid" size="16" />
          </Action>
        </Tooltip>
        <Tooltip content={'Alerts'}>
          <Action
            size="2"
            color="transparent"
            square
            aria-label="Alerts"
          >
            <Icon name="megaphone" size="16" />
          </Action>
        </Tooltip>
        <Tooltip content={'Sergio Korenko'}>
          <Action
            size="2"
            color="transparent"
            square
            aria-label="Sergio Korenko"
            onClick={() => setAccount(!account)}
          >
            <Icon name="circle-user" size="16" />
          </Action>
        </Tooltip>
      </Box>
      <Account
        settings={settings}
        account={account}
        setAccount={setAccount}
      />
    </header>
  )
}

export default Section
