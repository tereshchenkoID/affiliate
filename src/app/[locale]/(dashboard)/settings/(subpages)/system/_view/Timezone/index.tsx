import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useUser } from '@/hooks/useUser'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Select, { SelectOption } from '@/components/Form/Select'
import Box from '@/components/Layout/Box'

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
  )
}

export default Timezone
