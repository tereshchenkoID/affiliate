import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useUser } from '@/hooks/useUser'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Select, { SelectOption } from '@/components/Form/Select'
import Box from '@/components/Layout/Box'
import Grid from '@/components/Layout/Grid'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'

import style from '../index.module.scss'

import { SettingsProps } from '@/types/common'
interface FormState {
  timezone: SelectOption | null
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const Timezone = ({ settings }: { settings: SettingsProps }) => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()
  const { user } = useUser()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    timezone: user?.timezone,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isChanged = filter.timezone?.value !== user?.timezone?.value
  const isDisabled = isValidationErrors || !isChanged || !filter.timezone

  const setFieldError = (name: keyof FormState, err: string | null): void => {
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (isDisabled) return
  }

  return (
    <Grid gap="2" className={style.grid}>
      <Box>
        <Heading as="h4" size="4">Default timezone</Heading>
        <Text size="3" color="gray">Set the default time zone used for shared dates and system actions.</Text>
      </Box>
      <Box
        as="form"
        display="grid"
        gap="2"
        onSubmit={handleSubmit}
      >
        <Select
          data={settings?.timezone}
          value={filter.timezone}
          onChange={(val) => handlePropsChange('timezone', val)}
          placeholder={t('timezone')}
          isRequired
          isSearch
          rules={[
            VALIDATION_RULES.required(),
          ]}
          onValidate={(err) => setFieldError('timezone', err)}
          error={errors.timezone}
        />
        <Action
          type="submit"
          color="success"
          size="3"
          disabled={isDisabled}
        >
          {t('save')}
        </Action>
      </Box>
    </Grid>
  )
}

export default Timezone
