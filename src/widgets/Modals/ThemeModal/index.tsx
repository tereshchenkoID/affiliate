import React from 'react'
import { useTranslations } from 'next-intl'

import { useUser } from '@/hooks/useUser'

import Action from '@/components/Form/Action'
import { SelectOption } from '@/components/Form/Select'
import Box from '@/components/Layout/Box'
import Icon from '@/components/Overlay/Icon'

import style from './index.module.scss'

const THEME_ICONS: Record<string, string> = {
  light: 'sun',
  dark: 'moon',
  system: 'monitor',
}

const ThemeModal = ({ data } : { data: any }) => {
  const t = useTranslations()
  const { user, updateUser } = useUser()

  const handleSubmit = (value: SelectOption): void => {
    document.documentElement.setAttribute('data-theme', value?.value)

    updateUser({
      theme: value,
    })
  }

  return (
    <Box
      display="grid"
      gap="1"
      align="center"
      width="100%"
      className={style.form}
    >
      {
        data?.map((el: SelectOption, _: number) => {
          const isActive = el.value === user?.theme.value

          return (
            <Action
              key={el.value}
              size="2"
              color={isActive ? 'primary' : 'transparent'}
              active={isActive}
              justify="start"
              full={true}
              onClick={() => handleSubmit(el)}
            >
              <Icon name={THEME_ICONS[el.value]} size="16" />
              {t(el.value)}
            </Action>
          )}
        )
      }
    </Box>
  )
}

export default ThemeModal
