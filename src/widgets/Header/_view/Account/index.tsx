import { Dispatch, SetStateAction } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useModal } from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

import Action from '@/components/Form/Action'
import Box from '@/components/Layout/Box'
import Icon from '@/components/Overlay/Icon'
import Separator from '@/components/Overlay/Separator'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'

import style from './index.module.scss'

import { SettingsProps } from '@/types/common'

const Account = (
  {
    settings,
    account,
    setAccount
  }:
  {
    settings: SettingsProps,
    account: boolean,
    setAccount: Dispatch<SetStateAction<boolean>>
  }
) => {
  const t = useTranslations()
  const { user } = useUser()
  const { openModal } = useModal()
  const currentLocale = useLocale()

  const currentLang = settings?.languages?.find(el => el.value === currentLocale) || {
    value: currentLocale,
    label: currentLocale
  }

  return (
    <Box
      p="3"
      display="flex"
      direction="column"
      className={
        clsx(
          style.block,
          {
            [style.active]: account
          }
        )
      }
    >
      <Box pb="3">
        <Heading as="h4" size="5">{user?.profile?.name} {user?.profile?.surname}</Heading>
        <Text size="4" color="gray">{user?.profile?.email}</Text>
      </Box>
      <Separator color="gray" />
      <Box py="3">
        <Text size="4" color="gray">{t('project')}</Text>
        <Heading as="h4" size="5">Test Tech</Heading>
      </Box>
      <Box pb="3">
        <Action size="2" color="primary" full={true}>
          <Icon name="user" size="16" />
          {t('my_account')}
        </Action>
      </Box>
      <Separator color="gray" />
      <Box py="3">
        <Action
          size="2"
          color="transparent"
          justify="start"
          full={true}
          onClick={() => {
            openModal('language', { data: settings?.languages, locale: currentLang }, { title: t('notification.change_language') })
            setAccount(false)
          }}
        >
          <Icon name="globe" size="16" />
          {currentLang?.label} ({currentLang?.value})
        </Action>
        <Action
          size="2"
          color="transparent"
          justify="start"
          full={true}
          onClick={() => {
            openModal('theme', { data: settings?.themes }, { title: t('notification.change_theme') })
            setAccount(false)
          }}
        >
          <Icon name="sun" size="16" />
          {t('theme')}
        </Action>
        <Action size="2" color="transparent" justify="start" full={true}>
          <Icon name="shield-check" size="16" />
          {t('multifactor_authentication')}
        </Action>
        <Action
          size="2"
          color="transparent"
          justify="start"
          full={true}
          onClick={() => {
            openModal('password', { }, { title: t('notification.change_password') })
            setAccount(false)
          }}
        >
          <Icon name="lock" size="16" />
          {t('notification.change_password')}
        </Action>
      </Box>
      <Separator color="gray" />
      <Box py="3">
        <Action size="2" color="transparent" justify="start" full={true}>
          <Icon name="lightbulb" size="16" />
          {t('request_feature')}
        </Action>
        <Action size="2" color="transparent" justify="start" full={true}>
          <Icon name="bug" size="16" />
          {t('report_bug')}
        </Action>
      </Box>
      <Box mt="auto">
        <Action size="3" color="danger" full={true}>
          <Icon name="log-out" size="16" />
          {t('log_out')}
        </Action>
      </Box>
    </Box>
  )
}

export default Account
