import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { useValidations } from '@/hooks/useValidations'

import Action from '@/components/Form/Action'
import Field from '@/components/Form/Field'
import Box from '@/components/Layout/Box'

interface FormState {
  current: string
  new: string
  repeat: string
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

const PasswordModal = () => {
  const t = useTranslations()
  const VALIDATION_RULES = useValidations()

  const { filter, handlePropsChange } = useFilterState<FormState>({
    current: '',
    new: '',
    repeat: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const isValidationErrors = Object.values(errors).some(Boolean)
  const isDisabled = isValidationErrors || !filter.current || !filter.new || !filter.repeat

  const setFieldError = (name: keyof FormState, err: string | null): void => {
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <Box
      display="grid"
      gap="2"
      as="form"
      align="center"
      onSubmit={handleSubmit}
      width="100%"
    >
      <Field
        type="password"
        visibility={true}
        data={filter.current}
        placeholder={t('old_password')}
        onChange={(val) => handlePropsChange('current', val)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(6),
        ]}
        onValidate={(err) => setFieldError('current', err)}
        error={errors.current}
      />
      <Field
        type="password"
        visibility={true}
        data={filter.new}
        placeholder={t('new_password')}
        onChange={(val) => handlePropsChange('new', val)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(6),
        ]}
        onValidate={(err) => setFieldError('new', err)}
        error={errors.new}
      />
      <Field
        type="password"
        visibility={true}
        data={filter.repeat}
        placeholder={t('repeat_password')}
        onChange={(val) => handlePropsChange('repeat', val)}
        isRequired={true}
        rules={[
          VALIDATION_RULES.required(),
          VALIDATION_RULES.minLength(6),
          VALIDATION_RULES.match(filter.new),
        ]}
        onValidate={(err) => setFieldError('repeat', err)}
        error={errors.repeat}
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

export default PasswordModal
